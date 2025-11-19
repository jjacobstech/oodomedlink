<?php

namespace App\Http\Controllers\Clinics;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\EmailDelivery;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class EmailController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user()->name;
        $query = $request->query('page');

        $page  = filled($query) ? $query : 1;
        $emails = EmailDelivery::where('sent_by', $user)->with(['patient', 'result.files'])->forPage($page, 10)->get();


        return Inertia::render('User/Emails', [
            'emails' => $emails
        ]);
    }
}