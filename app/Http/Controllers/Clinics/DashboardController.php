<?php

namespace App\Http\Controllers\Clinics;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $stats = [

            'total_uploads' => 156,
            'total_patients' => 89,
            'pending_reviews' => 20,
            'completed_result' => 30
        ];

        return Inertia::render('User/Dashboard', [
            'user' => $user,
            'stats' => $stats
        ]);
    }
}
