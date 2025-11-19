<?php

namespace App\Http\Controllers\Clinics;

use Inertia\Inertia;
use App\Models\Patient;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PatientController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $total_patients = Patient::where('clinic_id', $user->id)->whereHas('patient_results', function ($result) {

            return $result;
        })->get();
        dd($total_patients);

        return Inertia::render('User/Patients', [
            'patients' => $total_patients
        ]);
    }
}