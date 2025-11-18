<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Clinics\FilesController;
use App\Http\Controllers\Clinics\DashboardController;

Route::prefix('clinic')->middleware(['auth:clinic'])->group(function () {
      Route::middleware(['verified'])->group(
            function () {

                  Route::get("/dashboard",  [DashboardController::class, 'index'])->name('user.dashboard');

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

      Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
      Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
      Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

      Route::prefix('result')->group(function () {
            Route::post('/', [FilesController::class, 'index'])->name('clinic.result');
            Route::post('upload', [FilesController::class, 'upload'])->name('clinic.result.upload');
            Route::post('send', [FilesController::class, 'send'])->name('clinic.result.send');
      });
});