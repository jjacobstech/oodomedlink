<?php

namespace App\Http\Controllers\Clinics;

use App\Models\File;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\PatientResult;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FilesController extends Controller
{

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

            $patient = Patient::create([
                'clinic_id' => Auth::user()->id,
                'full_name' => $validated->patient_name,
                'email' => $validated->patient_email,
            ]);

            $result =  PatientResult::create([
                'clinic_id' => Auth::user()->id,
                'patient_id' => $patient->id,
                'result_type' => $validated->result_type,
                'test_name' => $validated->test_name,
                'test_date' => $validated->test_date,
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

                $storedFile = Storage::disk('public')->putFileAs('uploads', $file, $fileName);
                $url = Storage::url($storedFile);

                File::create([
                    'result' => $result->id,
                    'file_name' => $fileName,
                    'file_url' => $url,
                    'file_path' => $storedFile,
                    'file_type' => $fileInfo->mime,
                    'file_size' => $fileInfo->size,
                    'original_file_name' => $fileInfo->name
                ]);
            }

            $message = $validated->sendViaEmail ? 'result uploaded and mailed successfully' : 'result uploaded successfully';
            DB::commit();
            return redirect(route('user.dashboard'))->with($message);
        } catch (\Throwable $th) {
            DB::rollBack();

            return  config('app.env') !== 'production' ? $th :  redirect(route('user.dashboard'))->with(['message' => 'server error']);
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
}