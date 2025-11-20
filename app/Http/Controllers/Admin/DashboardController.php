<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Admin;
use App\Models\Clinic;
use App\Models\Patient;
use Illuminate\Http\Request;
use App\Models\EmailDelivery;
use App\Models\PatientResult;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {

        $total_patients = Patient::all();

        $total_clinics = Clinic::all();
        $active_clinic = Clinic::where('status', 'active')->count();

        $total_results = PatientResult::with('files')->get();
        $pending_results = PatientResult::where('status', 'pending')->count();

        $total_emails = EmailDelivery::all();
        $emails_failed = EmailDelivery::where('status', 'failed')->count();

        $admins = Admin::all();


        $total_patients_count = $total_patients->count();
        $total_clinics_count = $total_clinics->count();
        $total_results_count = $total_results->count();
        $total_emails_count = $total_emails->count();



        // dd([
        //     'stats' => [
        //         'totalPatients' => $total_patients_count,
        //         'totalClinics' => $total_clinics_count,
        //         'totalResults' => $total_results_count,
        //         'totalEmails' => $total_emails_count,
        //         'pendingResults' => $pending_results,
        //         'emailsFailed' => $emails_failed,
        //         'activeClinics' => $active_clinic,

        //     ],
        //     'patients' => $total_patients,
        //     'clinics' => $total_clinics,
        //     'results' => $total_results,
        //     'emails' => $total_emails,
        //     'admins' => $admins
        // ]);

        return Inertia::render('Admin/Dashboard', [
            'user' => Auth::user(),
            'stats' => [
                'totalPatients' => $total_patients_count,
                'totalClinics' => $total_clinics_count,
                'totalResults' => $total_results_count,
                'totalEmails' => $total_emails_count,
                'pendingResults' => $pending_results,
                'emailsFailed' => $emails_failed,
                'activeClinics' => $active_clinic,

            ],
            'patients' => $total_patients,
            'clinics' => $total_clinics,
            'results' => $total_results,
            'emails' => $total_emails,
            'admins' => $admins
        ]);
    }
}