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
        // Get pagination and filter parameters
        $perPage = $request->input('per_page', 15);
        $activeTab = $request->input('tab', 'overview');
        $searchQuery = $request->input('search', '');
        $statusFilter = $request->input('status', 'all');

        // Statistics (no pagination needed)
        $total_patients_count = Patient::count();
        $total_clinics_count = Clinic::count();
        $active_clinics_count = Clinic::where('status', 'active')->count();
        $total_results_count = PatientResult::count();
        $pending_results_count = PatientResult::where('status', 'pending')->count();
        $total_emails_count = EmailDelivery::count();
        $emails_failed_count = EmailDelivery::where('status', 'failed')->count();

        // Conditionally load data based on active tab to optimize performance
        $clinics = null;
        $patients = null;
        $results = null;
        $emails = null;
        $admins = null;

        // Only load data for the active tab
        if ($activeTab === 'clinics' || $activeTab === 'overview') {
            $clinicsQuery = Clinic::query();

            if ($statusFilter !== 'all') {
                $clinicsQuery->where('status', $statusFilter);
            }

            if ($searchQuery) {
                $clinicsQuery->where(function ($query) use ($searchQuery) {
                    $query->where('name', 'like', "%{$searchQuery}%")
                        ->orWhere('email', 'like', "%{$searchQuery}%")
                        ->orWhere('state', 'like', "%{$searchQuery}%");
                });
            }

            $clinics = $clinicsQuery->orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page')
                ->withQueryString();
        }

        if ($activeTab === 'patients' || $activeTab === 'overview') {
            $patientsQuery = Patient::query();

            if ($searchQuery) {
                $patientsQuery->where(function ($query) use ($searchQuery) {
                    $query->where('full_name', 'like', "%{$searchQuery}%")
                        ->orWhere('email', 'like', "%{$searchQuery}%")
                        ->orWhere('id', 'like', "%{$searchQuery}%");
                });
            }

            $patients = $patientsQuery->orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page')
                ->withQueryString();
        }

        if ($activeTab === 'results' || $activeTab === 'overview') {
            $resultsQuery = PatientResult::with(['files', 'patient']);

            if ($statusFilter !== 'all') {
                $resultsQuery->where('status', $statusFilter);
            }

            if ($searchQuery) {
                $resultsQuery->where(function ($query) use ($searchQuery) {
                    $query->where('test_name', 'like', "%{$searchQuery}%")
                        ->orWhere('result_type', 'like', "%{$searchQuery}%");
                });
            }

            $results = $resultsQuery->orderBy('uploaded_at', 'desc')
                ->paginate($perPage, ['*'],  'page')
                ->withQueryString();
        }

        if ($activeTab === 'emails' || $activeTab === 'overview') {
            $emails = EmailDelivery::orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page')
                ->withQueryString();
        }

        if ($activeTab === 'admins' || $activeTab === 'overview') {
            $admins = Admin::orderBy('created_at', 'desc')
                ->paginate($perPage, ['*'], 'page')
                ->withQueryString();
        }

        return Inertia::render('Admin/Dashboard', [
            'user' => Auth::user(),
            'stats' => [
                'totalPatients' => $total_patients_count,
                'totalClinics' => $total_clinics_count,
                'totalResults' => $total_results_count,
                'totalEmails' => $total_emails_count,
                'pendingResults' => $pending_results_count,
                'emailsFailed' => $emails_failed_count,
                'activeClinics' => $active_clinics_count,
            ],
            'patients' => $patients,
            'clinics' => $clinics,
            'results' => $results,
            'emails' => $emails,
            'admins' => $admins,
            'filters' => [
                'search' => $searchQuery,
                'status' => $statusFilter,
                'per_page' => $perPage,
                'tab' => $activeTab,
            ],
        ]);
    }
}