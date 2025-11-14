<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('isClinic')->group(function () {
    Route::prefix('clinic')->middleware(['auth:clinic', 'verified'])->group(
        function () {

            Route::get("/dashboard", function () {
                return Inertia::render('User/Dashboard', [
                    'user' => Auth::user(),
                ]);
            })->name('user.dashboard');

            Route::get('/emails', function () {

                return Inertia::render('User/Emails', [
                    'user' => Auth::user(),
                ]);
            })->name('user.emails');

            Route::get('/patients', function () {

                return Inertia::render('User/Patients', [
                    'user' => Auth::user(),
                ]);
            })->name('user.patients');

            Route::get('/settings', function () {

                return Inertia::render('User/Settings', [
                    'user' => Auth::user(),
                ]);
            })->name('user.settings');
        }
    );



    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/clinic.php';
require __DIR__ . '/system.php';