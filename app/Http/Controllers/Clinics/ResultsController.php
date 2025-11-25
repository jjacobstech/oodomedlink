<?php

namespace App\Http\Controllers\Clinics;

use App\Notifications\EmailNotification;
use Carbon\Carbon;
use App\Models\File;
use App\Jobs\ResultJob;
use App\Models\Patient;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\EmailDelivery;
use App\Models\PatientResult;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ResultsController extends Controller
{
    public function index() {}

    public function upload(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'patient_email' => 'required|email|max:255',
            'test_date' => 'required|date',
            'result_type' => 'required|string|max:100',
            'test_name' => 'required|string|max:255',
            'file.*' => 'required|file|mimes:pdf,png,jpg,jpeg,csv,txt,doc,docx,odt,xlsx,xls|max:10240',
            'sendViaEmail' => 'nullable|boolean',
            'scheduleDate' => 'nullable|date|after_or_equal:today',
            'scheduleTime' => 'nullable|date_format:H:i',
            'notes' => 'nullable|string|max:1000'
        ]);

        $timezone = config('app.timezone');

        // Parse schedule time properly
        $schedule = null;
        if (!empty($validated['scheduleDate']) && !empty($validated['scheduleTime'])) {
            $schedule = Carbon::parse($validated['scheduleDate'] . ' ' . $validated['scheduleTime'], $timezone);
        }

        $uploadedFiles = [];
        $delayInSeconds = now()->diffInSeconds($schedule, false);
        $time = ceil($delayInSeconds);

        try {
            DB::beginTransaction();

            // Find or create patient
            $patient = Patient::firstOrCreate(
                [
                    'clinic_id' => $user->id,
                    'email' => $validated['patient_email']
                ],
                [
                    'full_name' => $validated['patient_name']
                ]
            );

            // Determine initial status
            $sendEmail = $validated['sendViaEmail'] ?? false;
            if ($sendEmail) {
                $status = 'sent';
            }

            // Create result record
            $result = PatientResult::create([
                'clinic_id' => $user->id,
                'patient_id' => $patient->id,
                'result_type' => $validated['result_type'],
                'test_name' => $validated['test_name'],
                'test_date' => $validated['test_date'],
                'status' => $status
            ]);

            // Process and store files
            $attachmentPaths = [];
            $files = $validated['file'];

            foreach ($files as $file) {
                $extension = $file->getClientOriginalExtension();
                $originalName = $file->getClientOriginalName();
                $mimeType = $file->getMimeType();
                $fileSize = $file->getSize(); // Fixed: get actual file size

                $name = Str::slug($user->name);
                $randStr = Str::random(30);
                $fileName = "{$name}_{$randStr}.{$extension}";

                // Store file
                $storedFile = Storage::putFileAs($extension, $file, $fileName);
                $path = Storage::path($storedFile);
                $url = Storage::url($storedFile);

                // Track for potential cleanup
                $uploadedFiles[] = $storedFile;
                $attachmentPaths[] = $path;

                // Create file record
                File::create([
                    'result' => $result->id,
                    'file_name' => $fileName,
                    'file_url' => $url,
                    'file_path' => $path,
                    'file_type' => $mimeType,
                    'file_size' => $fileSize,
                    'original_file_name' => $originalName
                ]);
            }

            // Handle email delivery
            if ($sendEmail) {
                $subject = "{$patient->full_name} Test Result";
                $notes = $validated['notes'] ?? '';

                $emailDelivery = EmailDelivery::create([
                    'patient_result_id' => $result->id,
                    'patient_email' => $patient->email,
                    'sent_by' => Str::lower($user->name),
                    'subject' => $subject,
                    'body' => $notes,
                    'status' => $schedule ? 'scheduled' : 'pending',
                    'sent_at' => $schedule ? null : now(),
                    'scheduled_at' => $schedule ?? now(),
                ]);

                // Dispatch email job
                ResultJob::dispatch(
                    $subject,
                    $patient,
                    $attachmentPaths,
                    $notes,
                    $emailDelivery->id,
                    $user
                )->delay($time);

                $message = 'Result uploaded and email ' .
                    ($schedule ? 'scheduled for ' . $schedule->format('d M Y h:ia') : 'sent') .
                    ' successfully';

                $user->notify(new EmailNotification($message));
            }

            DB::commit();

            $message = $sendEmail
                ? 'Result uploaded and email ' . ($schedule ? 'scheduled' : 'sent') . ' successfully'
                : 'Result uploaded successfully';

            return redirect()->route('user.dashboard')->with(['success' => $message]);
        } catch (\Throwable $th) {
            DB::rollBack();

            // Clean up uploaded files on error
            foreach ($uploadedFiles as $file) {
                Storage::delete($file);
            }

            // Log the error
            Log::error('Result upload failed', [
                'user_id' => $user->id,
                'error' => $th->getMessage(),
                'trace' => $th->getTraceAsString()
            ]);

            return redirect()->back()
                ->with(['error' => 'An error occurred while uploading the result. Please try again.']);
        }
    }
}