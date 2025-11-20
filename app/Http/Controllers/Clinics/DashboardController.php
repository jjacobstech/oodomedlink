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

        $validated = (object) $request->validate([
            'filter' => 'nullable|string|in:all,pending,sent,failed',
            'search' => 'nullable|string|min:1'
        ]);



        $filter = filled($request->filter) ? $validated->filter : 'all';
        $search = filled($request->search) ? $validated->search : '';

        $perPage = 10;

        $query = $request->query('page');

        $page  = filled($query) ? $query : 1;
        // dd($search);

        $total_uploads = PatientResult::where('clinic_id', $user->id)->count();
        $total_patients = Patient::where('clinic_id', $user->id)->count();
        $pending_results = PatientResult::where('clinic_id', $user->id)->where('status', 'pending')->count();
        $completed_results = PatientResult::where('clinic_id', operator: $user->id)->where('status', 'completed')->count();
        $results  = PatientResult::where('clinic_id', $user->id)
            // ->orWhere('result_type', 'like', "%{$search}%")
            ->when($filter != 'all', function ($q) use ($filter) {
                $q->where('status', $filter);
            })
            ->whereHas('patient', function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%");
            })
            ->with(['patient', 'files'])->paginate(perPage: $perPage, page: $page);

        // dd($results);

        $stats = [

            'total_uploads' => $total_uploads,
            'total_patients' => $total_patients,
            'pending_results' => $pending_results,
            'completed_result' => $completed_results
        ];




        return Inertia::render('User/Dashboard', [
            'user' => $user,
            'stats' => $stats,
            'results' => $results->items(),
            'filter' => $filter,
            'search' => $search,
            'page' => $page,
            'prevPage' => $results->previousPageUrl(),
            'nextPage' => $results->nextPageUrl()


        ]);
    }
}