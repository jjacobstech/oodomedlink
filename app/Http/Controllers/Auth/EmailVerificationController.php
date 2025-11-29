<?php

namespace App\Http\Controllers\Auth;

use Carbon\Carbon;
use Tzsk\Otp\Facades\Otp;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\EmailVerification;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\RateLimiter;
use PhpParser\ErrorHandler\Throwing;
use Throwable;

use function Laravel\Prompts\error;

class EmailVerificationController extends Controller
{

      private $expiry;
      private $digits;
      private $secret;

      public function __construct()
      {
            $this->expiry = config('otp.expiry');
            $this->secret = config('otp.secret');
            $this->digits = config('otp.digits');
      }

      public  function generateCurrentToken()
      {
            return Str::uuid7(Carbon::now());
      }
      public function send(Request $request)
      {
            $request->validate([
                  'email' => 'required|email|unique:clinics,email',
            ]);
            $email =  $request->email;

            $current_token = $this->generateCurrentToken();


            $otp = Otp::expiry($this->expiry)->digits($this->digits)->generate("$this->secret$request->email$current_token");

            Cache::put('current_token', $current_token, now()->addMinutes(1));

            Log::info("otp sent to $email");
            Log::info("current token: $current_token");

            if (!$otp) {

                  $data = ['sent' => false, 'message' => 'unable to send mail at the moment. please try again later'];


                  return redirect(route('signup'), 302)->with('data', $data);
            }

            $mail = Mail::to($email)->send(new EmailVerification($otp, $email, config('otp.expiry'), config('mail.from.address')));

            if (!$mail) {

                  $data = ['sent' => false, 'message' => 'unable to send mail at the moment. please try again later'];

                  session()->put('data', $data);

                  return redirect(route('signup'), 302)->with('data', $data);
            }

            $data = ['sent' => true, 'email' => $email, 'time' => config('otp.expiry')];


            return redirect(route('signup'), 302)->with('data', $data);
      }

      public function verify(Request $request)
      {
            $request->validate([
                  'otp' => 'required|string|max:' . config('otp.digits'),
                  'email' => 'required|email',
            ]);

            $current_token = Cache::get('current_token');

            $match = Otp::expiry($this->expiry)->digits($this->digits)->match($request->otp, "$this->secret$request->email$current_token");



            Log::info("otp sent to $request->email");
            Log::info("current token: $current_token");
            // dd($match, $token_deleted);



            if (!$match) {

                  $data = ['status' => false, 'verified' => $match, 'message' => 'invalid otp'];

                  return redirect(route('signup'), 302)->with('data', $data);
            }

            $token_deleted = Cache::delete('current_token');
            Log::info("current token deleted: $token_deleted");


            $data = ['status' => true, 'verified' => $match, 'message' => 'Email Verification Successful'];


            return redirect(route('signup'), 302)->with('data', $data);
      }
}