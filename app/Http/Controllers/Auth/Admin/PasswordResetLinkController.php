<?php

namespace App\Http\Controllers\Auth\Admin;

use Inertia\Inertia;
use Inertia\Response;
use Tzsk\Otp\Facades\Otp;
use Illuminate\Http\Request;
use App\Mail\EmailVerification;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;


class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Admin/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function send(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:admins,email',
        ]);

        $email =  $request->email;

        $secret = $email . config('otp.secret');
        $otp = Otp::generate($secret);

        if (!$otp) {

            $data = ['sent' => false, 'message' => 'unable to send mail at the moment. please try again later'];

            session()->put('data', $data);

            return redirect(route('admin.password.request'), 302)->with('data', $data);
        }

        $mail = Mail::to($email)->send(new EmailVerification($otp, $email, config('otp.expiry'), config('mail.from.address')));

        if (!$mail) {

            $data = ['sent' => false, 'message' => 'unable to send mail at the moment. please try again later'];

            session()->put('data', $data);

            return redirect(route('admin.password.request'), 302)->with('data', $data);
        }

        $data = ['sent' => true, 'email' => $email, 'time' => config('otp.expiry')];

        session()->put('data', $data);

        return redirect(route('admin.password.request'), 302)->with('data', $data);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'otp' => 'required|string|max:' . config('otp.digits'),
            'email' => 'required|email|exists:admins,email',
        ]);


        $data = ['status' => true, 'message' => 'Email Verification Successful'];

        session()->put('data', $data);

        return redirect(route('admin.password.request'), 302)->with('data', $data);
    }
}
