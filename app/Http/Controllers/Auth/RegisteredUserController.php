<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Clinic;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/User/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'clinic_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:clinics,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone_no' =>  'required|string|max:255',
            'address' =>  'required|string|max:255',
            'state' => 'required|string|max:255',
            'country' =>  'required|string|max:255',

        ]);

        $user = Clinic::create([
            'name' => $request->clinic_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone_no' =>  $request->phone_no,
            'address' => $request->address,
            'state' => $request->state,
            'country' => $request->country,
            'email_verified_at' => now()
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('user.dashboard', absolute: false));
    }
}
