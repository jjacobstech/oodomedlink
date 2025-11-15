<?php

namespace App\Http\Controllers\clinics;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FilesController extends Controller
{
    public function upload(Request $request)
    {
        $validated = (object) $request->validate(
            [
                'patient_name' => 'required|string',
                'patient_email' => 'required|string|email',
                'result_type' => 'required|string',
                'file' => 'required|file|max:800',
            ]
        );

        dd($validated);
    }
}