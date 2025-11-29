<?php

namespace App\Http\Controllers\Auth;


use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use App\Models\Clinic;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{


    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function reset(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);



        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // redirect them back to where they came from with their error message.
        $user = Clinic::where('email', $request->email);
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => [trans('passwords.reset')],
            ]);
        }

        $user->update([
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(60),
        ]);

        event(new PasswordReset($user));

        return redirect()->route('login');
    }
}