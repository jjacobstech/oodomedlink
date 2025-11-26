<?php

namespace App\Http\Controllers\Auth\Admin;

use Inertia\Inertia;
use Tzsk\Otp\Facades\Otp;
use Illuminate\Http\Request;
use App\Mail\EmailVerification;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;


class EmailVerificationController extends Controller
{
      public function send(Request $request)
      {
            $request->validate([
                  'email' => 'required|email|unique:admins,email',
            ]);

            $email =  $request->email;

            $secret = $email . config('otp.secret');
            $otp = Otp::generate($secret);

            if (!$otp) {

                  $data = ['sent' => false, 'message' => 'unable to send mail at the moment. please try again later'];

                  session()->put('data', $data);

                  return redirect(route('admin.signup'), 302)->with('data', $data);
            }

            $mail = Mail::to($email)->send(new EmailVerification($otp, $email, config('otp.expiry'), config('mail.from.address')));

            if (!$mail) {

                  $data = ['sent' => false, 'message' => 'unable to send mail at the moment. please try again later'];

                  session()->put('data', $data);

                  return redirect(route('admin.signup'), 302)->with('data', $data);
            }

            $data = ['sent' => true, 'email' => $email, 'time' => config('otp.expiry')];

            session()->put('data', $data);

            return redirect(route('admin.signup'), 302)->with('data', $data);
      }

      public function verify(Request $request)
      {
            $request->validate([
                  'otp' => 'required|string|max:' . config('otp.digits'),
                  'email' => 'required|email|unique:admins,email',
            ]);

            $match = Otp::verify($request->otp, config('otp.secret'));

            if (!$match) {

                  $data = ['status' => true, 'verified' => $match, 'message' => 'invalid otp'];

                  session()->put('data', $data);

                  return redirect(route('admin.signup'), 302)->with('data', $data);
            }

            $data = ['status' => true, 'verified' => $match, 'message' => 'invalid otp'];

            session()->put('data', $data);

            return redirect(route('admin.signup'), 302)->with('data', $data);
      }
}