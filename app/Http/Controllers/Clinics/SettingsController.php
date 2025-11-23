<?php

namespace App\Http\Controllers\Clinics;

use Inertia\Inertia;
use App\Models\Clinic;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class SettingsController extends Controller
{
      /**
       * Display the settings page
       */
      public function edit()
      {
            $user = Auth::guard('clinic')->user();

            return Inertia::render('User/Settings', [
                  'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'avatar' => $user->avatar ? Storage::url($user->avatar) : null,
                        'phone_no' => $user->phone_no,
                        'address' => $user->address,
                        'state' => $user->state,
                        'country' => $user->country,
                  ],
            ]);
      }

      /**
       * Update the user's profile information
       */
      public function update(Request $request)
      {
            $user = Auth::guard('clinic')->user();
            $user = Clinic::find($user->id);

            // Validate the request
            $validated = $request->validate([
                  'name' => ['required', 'string', 'max:255'],
                  'email' => ['required', 'string', 'email', 'max:255', 'unique:clinics,email,' . $user->id],
                  'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'], // 2MB max
                  'phone_no' => ['nullable', 'string', 'max:20'],
                  'address' => ['nullable', 'string', 'max:500'],
                  'state' => ['nullable', 'string', 'max:100'],
                  'country' => ['nullable', 'string', 'max:100'],
                  'current_password' => ['nullable', 'required_with:password', 'string'],
                  'password' => ['nullable', 'confirmed', Password::defaults()],
            ]);


            // Handle avatar upload
            if ($request->hasFile('avatar')) {
                  $file = $validated['avatar'];


                  $extension = $file->getClientOriginalExtension();

                  $name = Str::slug($user->name);
                  $randStr = Str::random(30);
                  $fileName = "{$name}.{$extension}";

                  // Store file
                  $storedFile = Storage::putFileAs('avatars', $file, $fileName);
                  $path = Storage::path($storedFile);
                  $url = Storage::url($storedFile);

                  // Store new avatar
                  $validated['avatar'] = $url;
            }

            // Handle password change
            if ($request->filled('password')) {
                  // Verify current password
                  if (!Hash::check($request->current_password, $user->password)) {
                        return back()->withErrors([
                              'current_password' => 'The provided password does not match your current password.',
                        ]);
                  }

                  $validated['password'] = Hash::make($request->password);
            } else {
                  // Remove password fields if not changing password
                  unset($validated['password']);
                  unset($validated['current_password']);
            }

            // Update user
            $user->update($validated);

            return back()->with('success', 'Profile updated successfully!');
      }

      /**
       * Delete the user's avatar
       */
      public function deleteAvatar()
      {
            $user = Auth::guard('clinic')->user();
            $user = Clinic::find($user->id);

            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                  Storage::disk('public')->delete($user->avatar);
                  $user->update(['avatar' => null]);
            }

            return back()->with('success', 'Avatar deleted successfully!');
      }
}