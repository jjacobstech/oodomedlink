<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'user' => Auth::user(),
            'data' => []
        ]);
    }
}
