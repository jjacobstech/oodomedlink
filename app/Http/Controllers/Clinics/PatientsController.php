<?php

namespace App\Http\Controllers\Clinics;

use Inertia\Inertia;
use App\Models\Patient;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class PatientsController extends Controller
{
    /**
     * Display a listing of patients
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'gender' => 'nullable|string|in:Male,Female,Other',
            'search' => 'nullable|string|min:1|max:255'
        ]);

        $gender = $validated['gender'] ?? null;
        $search = $validated['search'] ?? '';

        $patients = Patient::where('clinic_id', $user->id)
            ->with(['latestResult:id,result_type,uploaded_at,status'])
            ->withCount('results')
            ->when($gender, function ($query) use ($gender) {
                $query->where('gender', $gender);
            })
            ->when(!empty($search), function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone_no', 'like', "%{$search}%");
                });
            })
            ->latest('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('User/Patients', [
            'patients' => $patients,
            'filters' => [
                'search' => $search,
                'gender' => $gender,
            ]
        ]);
    }

    /**
     * Show the form for creating a new patient
     */
    public function create()
    {
        return Inertia::render('User/Patients');
    }

    /**
     * Store a newly created patient
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('patients')->where(function ($query) use ($user) {
                    return $query->where('clinic_id', $user->id);
                })
            ],
            'phone_no' => 'required|string|max:20',
            'gender' => 'required|in:Male,Female,Other',
            'date_of_birth' => 'nullable|date|before:today',
            'address' => 'nullable|string|max:500',
        ]);

        $patient = Patient::create([
            ...$validated,
            'clinic_id' => $user->id,
        ]);

        return redirect()
            ->route('user.patients')
            ->with('success', 'Patient added successfully.');
    }

    /**
     * Display the specified patient
     */
    public function show(Patient $patient)
    {
        $user = Auth::user();

        // Verify the patient belongs to this clinic
        if ($patient->clinic_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $patient->load([
            'results' => function ($query) {
                $query->with('files')->latest('uploaded_at');
            }
        ]);



        return Inertia::render('User/Patient', [
            'patient' => $patient,
        ]);
    }

    /**
     * Show the form for editing the specified patient
     */
    public function edit(Patient $patient)
    {
        $user = Auth::user();

        // Verify the patient belongs to this clinic
        if ($patient->clinic_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }


        return Inertia::render('User/Patients', [
            'patient' => $patient,
        ]);
    }

    /**
     * Update the specified patient
     */
    public function update(Request $request, Patient $patient)
    {
        $user = Auth::user();

        // Verify the patient belongs to this clinic
        if ($patient->clinic_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('patients')->where(function ($query) use ($user) {
                    return $query->where('clinic_id', $user->id);
                })->ignore($patient->id)
            ],
            'phone_no' => 'required|string|max:20',
            'gender' => 'required|in:Male,Female,Other',
            'date_of_birth' => 'nullable|date|before:today',
            'address' => 'nullable|string|max:500',
        ]);

        $patient->update($validated);

        return redirect()
            ->back()
            ->with('success', 'Patient updated successfully.');
    }

    /**
     * Remove the specified patient
     */
    public function destroy(Patient $patient)
    {
        $user = Auth::user();

        // Verify the patient belongs to this clinic
        if ($patient->clinic_id !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        // Check if patient has results
        // if ($patient->results()->count() > 0) {
        //     return redirect()
        //         ->back()
        //         ->with('error', 'Cannot delete patient with existing results.');
        // }

        $patient->delete();

        return redirect()
            ->route('user.patients')
            ->with('success', 'Patient deleted successfully.');
    }
}