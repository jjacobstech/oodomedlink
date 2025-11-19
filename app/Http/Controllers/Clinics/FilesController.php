<?php

namespace App\Http\Controllers\Clinics;

use Exception;
use App\Models\File;
use Inertia\Inertia;
use App\Models\Patient;
use App\Mail\ResultMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\EmailDelivery;
use App\Models\PatientResult;
use PHPUnit\Event\Code\Throwable;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class FilesController extends Controller
{

    protected string $subject;

    public function index() {}
    public function upload(Request $request)
    {
        $user = Auth::user();
        $rules = [
            'patient_name' => 'required|string',
            'patient_email' => 'required|string|email',
            'test_date' => 'required|string',
            'result_type' => 'required|string',
            'test_name' => 'required|string',
            'file.*' => 'required|file',
            'sendViaEmail' => 'string|in:1,0',
        ];

        $rules =  filled($request->notes) ? array_merge($rules, ['notes' => 'string|min:1']) : $rules;

        $validated = (object) $request->validate(
            $rules
        );

        try {
            DB::beginTransaction();

            $exists = Patient::where('clinic_id', Auth::user()->id)->where('email', $validated->patient_email)->exists();

            // dd($exists);

            if ($exists) {
                $patient = Patient::where('clinic_id', Auth::user()->id)->where('email', $validated->patient_email)->first();
                $created = false;
            } else {
                $patient = Patient::create([
                    'clinic_id' => Auth::user()->id,
                    'full_name' => $validated->patient_name,
                    'email' => $validated->patient_email,
                ]);
                $created = true;
            }

            // dd($patient, $created);

            $result =  PatientResult::create([
                'clinic_id' => Auth::user()->id,
                'patient_id' => $patient->id,
                'result_type' => $validated->result_type,
                'test_name' => $validated->test_name,
                'test_date' => $validated->test_date,
                'status' => 'sent'
            ]);

            $files = $validated->file;

            foreach ($files as $file) {
                $fileInfo = (object) [
                    'extension' =>  $file->getClientOriginalExtension(),
                    'name' =>  $file->getClientOriginalName(),
                    'mime' => $file->getMimeType(),
                    'size' => $file->getMaxFilesize()
                ];

                $name =  Str::replace(' ', '_',  $user->name);
                $randStr = Str::random('30');
                $fileName = "{$name}_{$randStr}.{$fileInfo->extension}";

                $storedFile = Storage::putFileAs(
                    $fileInfo->extension,
                    $file,
                    $fileName
                );
                $path = Storage::path($storedFile);
                $url = Storage::url($storedFile);

                $attachment = [];

                array_push($attachment,  $path);

                File::create([
                    'result' => $result->id,
                    'file_name' => $fileName,
                    'file_url' => $url,
                    'file_path' => $path,
                    'file_type' => $fileInfo->mime,
                    'file_size' => $fileInfo->size,
                    'original_file_name' => $fileInfo->name
                ]);
            }


            if ($validated->sendViaEmail) {
                $attempt = 0;
                $this->subject = "$patient->full_name Test Result";
                $sent = $this->sendEmail($patient, $attachment, $validated->notes ?? '');

                while (!$sent) {
                    $sent = $this->sendEmail($patient, $attachment, $validated->notes ?? '');

                    $attempt++;

                    if ($attempt === 5) {
                        throw new Exception;
                    }
                }

                EmailDelivery::create([
                    'patient_result_id' => $result->id,
                    'patient_email' => $patient->email,
                    'sent_by' => Auth::user()->name,
                    'subject' => $this->subject,
                    'body' => '',
                    'status' => 'sent',
                    'sent_at' => now(),
                    'delivery_attempts' => $attempt
                ]);
            }

            $message = $validated->sendViaEmail ? 'result uploaded and mailed successfully' : 'result uploaded successfully';
            DB::commit();
            return redirect()->route('user.dashboard')->with($message);
        } catch (\Throwable $th) {
            DB::rollBack();

            return  config('app.env') !== 'production' ? $th :  redirect()->route('user.dashboard')->with(['message' => 'server error']);
        }
    }

    public function send(Request $request)
    {
        $validated = (object) $request->validate(
            [
                'result_id' => 'required|string|exists:patient_results,id',
            ]
        );

        dd($validated);
    }

    public function sendEmail(object $receipient,  array $attachment, string  $notes)
    {

        // try {
        //     Mail::to($receipient->email)->send(new ResultMail($receipient, $this->subject, $attachment));
        //     return true;
        // } catch (\Throwable $th) {
        //     return  $th;
        // }
        $mail = Mail::to($receipient->email)->send(new ResultMail($receipient, $this->subject, $attachment, $notes));

        if ($mail) {
            return true;
        }
        return false;
    }
}