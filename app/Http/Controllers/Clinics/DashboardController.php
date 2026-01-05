<?php

namespace App\Http\Controllers\Clinics;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\PatientResult;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'filter' => 'nullable|string|in:all,pending,sent,failed',
            'search' => 'nullable|string|min:1|max:255'
        ]);

        $filter = $validated['filter'] ?? 'all';
        $search = $validated['search'] ?? '';
        $apiKey = config('services.gemini.api_key');

        // dd($filter);
        // Get statistics
        $stats = [
            'total_uploads' => PatientResult::where('clinic_id', $user->id)->count(),
            'total_patients' => Patient::where('clinic_id', $user->id)->count(),
            'pending_results' => PatientResult::where('clinic_id', $user->id)
                ->where('status', 'pending')
                ->count(),
            'completed_result' => PatientResult::where('clinic_id', $user->id)
                ->where('status', 'uploaded') // Changed from 'completed' to match frontend expectations
                ->count(),
        ];

        // Query results with filters
        $results = PatientResult::where('clinic_id', $user->id)
            ->with(['patient:id,full_name,email', 'files'])
            ->when($filter !== 'all', function ($query) use ($filter) {
                $query->where('status', $filter);
            })
            ->when(!empty($search), function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    // Search in patient name
                    $q->whereHas('patient', function ($patientQuery) use ($search) {
                        $patientQuery->where('full_name', 'like', "%{$search}%");
                    })
                    // OR search in result type
                    ->orWhere('result_type', 'like', "%{$search}%");
            });
            })
            ->latest('uploaded_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('User/Dashboard', [
            'user' => $user,
            'stats' => $stats,
            'results' => $results,
            'apiKey' => $apiKey,
            'filters' => [
                'search' => $search,
                'filter' => $filter,
            ]
        ]);
    }
}