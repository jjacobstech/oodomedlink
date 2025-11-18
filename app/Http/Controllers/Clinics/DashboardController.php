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
        $query = $request->query('page');

        $page  = filled($query) ? $query : 1;


        $total_uploads = PatientResult::where('clinic_id', $user->id)->count();
        $total_patients = Patient::where('clinic_id', $user->id)->count();
        $pending_results = PatientResult::where('clinic_id', $user->id)->where('status', 'pending')->count();
        $completed_results = PatientResult::where('clinic_id', operator: $user->id)->where('status', 'completed')->count();
        $results  = PatientResult::where('clinic_id', $user->id)->with(['patient', 'files'])->forPage($page, 10)->get();

        // dd($results);

        $stats = [

            'total_uploads' => $total_uploads,
            'total_patients' => $total_patients,
            'pending_results' => $pending_results,
            'completed_result' => $completed_results
        ];

        // $results->files->each(function ($file) {
        //     dd($file);
        // });


        return Inertia::render('User/Dashboard', [
            'user' => $user,
            'stats' => $stats,
            'results' => $results

        ]);
    }

    public function fetchResults(Request $request)
    {
        $request->validate([
            'status' => 'in:all,pending,sent,failed'
        ]);
    }
}