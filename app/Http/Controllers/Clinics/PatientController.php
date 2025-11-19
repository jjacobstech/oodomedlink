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
        $total_patients = Patient::where('clinic_id', $user->id)
            ->with(['results', 'latestResult'])
            ->withCount('results')
            ->get();

        return Inertia::render('User/Patients', [
            'patients' => $total_patients
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|string|exists:patients,id'
        ]);
        $user = Auth::user();
        $patient = Patient::where('clinic_id', $user->id)
            ->where('email', $request->patient_id)
            ->get();

        dd($patient);

        return Inertia::render('User/Patient', [
            'patient' => $patient
        ]);
    }
    public function show(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|string|exists:patients,id'
        ]);
        $user = Auth::user();


        $patient = Patient::where('clinic_id', $user->id)
            ->where('id', $request->patient_id)
            ->first();

        dd($patient);

        return Inertia::render('User/Patient', [
            'patient' => $patient
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|string|exists:patients,id',
            'full_name' => 'required|string',
            'email' => 'required|string',
            'phone_no' => 'required|string',
            'gender' => 'required|string',
            'date_of_birth' => 'required|string',
            'address' => 'required|string',
        ]);
        $user = Auth::user();
        $patient = Patient::where('clinic_id', $user->id)
            ->where('email', $request->patient_id)
            ->first();



        dd($patient);

        return Inertia::render('User/Patient', [
            'patient' => $patient
        ]);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'patient_id' => 'required|string|exists:patients,id'
        ]);
        $user = Auth::user();
        $patient = Patient::where('clinic_id', $user->id)
            ->where('email', $request->patient_id)
            ->get();

        dd($patient);

        return Inertia::render('User/Patient', [
            'patient' => $patient
        ]);
    }
}