<?php
namespace App\Http\Controllers\Clinics;

use App\Actions\Chat\GeminiChat;
use App\Actions\OCR\TextExtractor;
use App\Http\Controllers\Controller;
use App\Jobs\MessagingJob;
use App\Jobs\ResultJob;
use App\Models\EmailDelivery;
use App\Models\File;
use App\Models\Patient;
use App\Models\PatientResult;
use App\Models\WhatsappMessage;
use App\Notifications\EmailNotification;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use phpDocumentor\Reflection\Types\True_;

class ResultsController extends Controller
{
    public function index() {}

    public function upload(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'patient_name'     => 'required|string|max:255',
            'patient_email'    => 'required|email|max:255',
            'patient_phone_no' => 'required|max:15',
            'test_date'        => 'required|date',
            'result_type'      => 'required|string|max:100',
            'test_name'        => 'required|string|max:255',
            'file.*'           => 'required|file|mimes:pdf,png,jpg,jpeg,csv,txt,doc,docx,odt,xlsx,xls|max:10240',
            'sendViaEmail'     => 'nullable|boolean',
            'scheduleDate'     => 'nullable|date|after_or_equal:today',
            'scheduleTime'     => 'nullable|date_format:H:i',
            'notes'            => 'nullable|string|max:1000',
            'sendViaWhatsapp'  => 'nullable|boolean',
            'summary'          => 'string|nullable',

        ]);

        $timezone = config('app.timezone');
        $note = $validated['notes'] ? ("<b>Notes:<br></b>" . e($validated['notes'])) . "<br><br>" : '';
        $summary  = $validated['summary'] ? ("<b>Summary:<br></b>" . e($validated['summary'])) : '';
        $notes = "$note$summary";

        // Parse schedule time properly
        $schedule = null;
        if (! empty($validated['scheduleDate']) && ! empty($validated['scheduleTime'])) {
            $schedule = Carbon::parse($validated['scheduleDate'] . ' ' . $validated['scheduleTime'], $timezone);
        }

        $uploadedFiles = [];

        try {
            DB::beginTransaction();

            // Find or create patient
            $patient = Patient::firstOrCreate(
                [
                    'clinic_id' => $user->id,
                    'email'     => $validated['patient_email'],
                ],
                [
                    'phone_no'  => $validated['patient_phone_no'],
                    'full_name' => $validated['patient_name'],
                ]
            );

            // Determine initial status
            $sendEmail    = $validated['sendViaEmail'];
            $sendWhatsapp = $validated['sendViaWhatsapp'];

            // Create result record
            $result = PatientResult::create([
                'clinic_id'   => $user->id,
                'patient_id'  => $patient->id,
                'result_type' => $validated['result_type'],
                'test_name'   => $validated['test_name'],
                'test_date'   => $validated['test_date'],
                'status'      => 'uploaded',
                'notes'       => $notes
            ]);

            // Process and store files
            $attachmentPaths = [];
            $mediaUrls       = [];
            $files           = $validated['file'];

            foreach ($files as $file) {
                $extension    = $file->getClientOriginalExtension();
                $originalName = $file->getClientOriginalName();
                $mimeType     = $file->getMimeType();
                $fileSize     = $file->getSize(); // Fixed: get actual file size

                $name     = Str::slug($user->name);
                $randStr  = Str::random(30);
                $fileName = "{$name}_{$randStr}.{$extension}";

                // Store file
                $storedFile = Storage::putFileAs($extension, $file, $fileName);
                $path       = Storage::path($storedFile);
                $url        = Storage::url($storedFile);

                // Track for potential cleanup
                $uploadedFiles[]   = $storedFile;
                $attachmentPaths[] = $path;
                $mediaUrls[]       = $url;

                // Create file record
                File::create([
                    'result'             => $result->id,
                    'file_name'          => $fileName,
                    'file_url'           => $url,
                    'file_path'          => $path,
                    'file_type'          => $mimeType,
                    'file_size'          => $fileSize,
                    'original_file_name' => $originalName,
                ]);
            }

            // Handle email delivery
            $subject = "{$patient->full_name} Test Result";

            $emailDelivery = EmailDelivery::create([
                'patient_result_id' => $result->id,
                'patient_email'     => $patient->email,
                'sent_by'           => $user->id,
                'subject'           => $subject,
                'body'              => $notes,
                'status'            => $schedule ? 'scheduled' : 'pending',
                'sent_at'           => $schedule ? null : now(),
                'scheduled_at'      => $schedule ?? now(),
            ]);

            // Dispatch email job
            if (! $schedule) {
                $this->sendEmail($subject, $patient, $attachmentPaths, $notes, $emailDelivery->id, $user, $schedule);
            }

            if ($sendWhatsapp) {

                $messagingDelivery = WhatsappMessage::create([
                    'patient_result_id' => $result->id,
                    'patient_id'        => $patient->id,
                    'patient_email'     => $patient->email,
                    'sent_by'           => $user->id,
                    'subject'           => $subject,
                    'body'              => $notes,
                    'status'            => $schedule ? 'scheduled' : 'pending',
                    'sent_at'           => $schedule ? null : now(),
                    'scheduled_at'      => $schedule ?? now(),
                ]);

                // Dispatch whatsapp job
                if (! $schedule) {

                    Log::debug('whatsapp message scheduled', [$schedule]);

                    $this->sendWhatsapp($subject, $patient, $mediaUrls, $notes, $messagingDelivery->id, $user, $schedule);
                }
            }

            $message = 'Result uploaded and email ' .
                ($schedule ? 'scheduled for ' . $schedule->format('d M Y h:ia') : 'sent') .
                ' successfully';

            $user->notify(new EmailNotification($message));

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
                'error'   => $th->getMessage(),
                'trace'   => $th->getTraceAsString(),
            ]);

            return redirect()->back()
                ->with(['error' => 'An error occurred while uploading the result. Please try again.']);
        }
    }

    public function sendEmail(string $subject, Patient $patient, array $attachmentPaths, string $notes, string $emailDeliveryId, $user, ?Carbon $schedule)
    {
        try {
            ResultJob::dispatch(
                $subject,
                $patient,
                $attachmentPaths,
                $notes,
                $emailDeliveryId,
                $user
            )->delay($schedule);
        } catch (\Exception $e) {
            Log::error('email send error', ['error' => $e->getMessage()]);
            return $e;
        }
    }

    public function sendWhatsapp(string $subject, Patient $patient, array $attachmentPaths, string $notes, string $emailDeliveryId, $user, ?Carbon $schedule)
    {
        try {

            MessagingJob::dispatch(
                $subject,
                $patient,
                $attachmentPaths,
                $notes,
                $emailDeliveryId,
                $user
            )->delay($schedule);
        } catch (\Exception $e) {
            Log::error('whatsapp send error', ['error' => $e->getMessage()]);
            return $e;
        }
    }

    public function sendToOcr(Request $request)
    {
        $validated = $request->validate([
            'patient_name' => 'required|string|max:255',
            'test_date'    => 'required|date',
            'result_type'  => 'required|string|max:100',
            'test_name'    => 'required|string|max:255',
            'file.*'       => 'required|file|mimes:pdf,png,jpg,jpeg,csv,txt,doc,docx,odt,xlsx,xls|max:10240',
        ]);

        // dd($validated);

        $files     = $validated['file'];
        $name      = $validated['patient_name'];
        $nameArray = explode(' ', $name);
        foreach ($files as $file) {

            $extension = $file->getClientOriginalExtension();
            $mimeType  = $file->getMimeType();

            $name     = Str::slug($name);
            $randStr  = Str::random(30);
            $fileName = "{$name}_{$randStr}.{$extension}";

            // Store file
            $storedFile = Storage::putFileAs($extension, $file, $fileName);
            $path       = Storage::path($storedFile);
        }

        try {

            $extractor = new TextExtractor();
            $document  = $extractor->processDocument($path, $mimeType);
            $inputs    = [...$nameArray, $validated['result_type'], $validated['test_name']];

            $validator = $this->validateText($document, $inputs);
            $text  = $extractor->extractText($document);
            Log::debug('status', ['document status' => $validator]);

            $exist_map =  $validator->exists_map;

            $allExist = true;

            // check if names exists in thre exists map if it does it allExists remains true  else the test fails and allExists becomes false
            foreach ($nameArray as $key) {
                if (array_key_exists($key, $exist_map)) {
                    $termExists = $exist_map[$key];

                    if (!$termExists) {
                        $allExist = false;
                        break;
                    }
                } else {
                    $allExist = false;
                    break;
                }
            }

            $trace_map = [
                'name' => $allExist,
                'result_type' => $exist_map[$validated['result_type']],
                'test_name' => $exist_map[$validated['test_name']],
            ];



            return (object)['status' => $validator->check, 'map' => $exist_map, 'trace' => $trace_map, 'document' => $text];
        } catch (\Exception $e) {
            Log::error('ocr send error', ['error' => $e->getMessage()]);
            // file_put_contents(public_path('ocr_error_logs.txt'), $e);
            return ['error' => $e->getMessage(), 'status' => false];
        }
    }

    public function validateText($document, array $inputs): object
    {
        try {
            $extractor = new TextExtractor();

            $text = $extractor->extractText($document);

            $validation = $extractor->allTermsExist($document, $text, $inputs);
            $exist_map  = $validation['exists_map'];

            $test_map = [];

            foreach ($inputs as $input) {
                $test_map[] = $exist_map[$input];
            }

            // rather that conditional checking this checks if all the terms exist  in the exist map array if it does it check passes if not it fails
            $check = true;
            foreach ($inputs as $key) {
                if (array_key_exists($key, $exist_map)) {
                    $termExists = $exist_map[$key];

                    if (!$termExists) {
                        $check = false;
                        break;
                    }
                }
            }

            return (object) ['check' => $check, 'exists_map' => $exist_map];
        } catch (\Exception $e) {
            Log::error('text validation error', ['error' => $e->getMessage()]);
            return $e;
        }
    }

    public function summarizeResult(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string',
        ]);

        $geminiChat = new GeminiChat();
        $response   = $geminiChat->init("Summarize this result to the patient:" . $validated['text'] ?? '');
        file_put_contents('AIlogs.txt', $response);
        return str_replace('*', '', $response->getData()->data->candidates[0]->content->parts[0]->text) ?? false;
    }
}