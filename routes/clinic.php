<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Clinics\EmailController;
use App\Http\Controllers\Clinics\FilesController;
use App\Http\Controllers\Clinics\DashboardController;
use App\Http\Controllers\Clinics\PatientController;

Route::prefix('clinic')->middleware(['auth:clinic'])->group(function () {
      Route::middleware(['verified'])->group(
            function () {

                  Route::get("/dashboard",  [DashboardController::class, 'index'])->name('user.dashboard');

                  Route::get('/emails', [EmailController::class, 'index'])->name('user.emails');

                  Route::get('/patients', [PatientController::class, 'index'])->name('user.patients');

                  // Patient Routes
                  Route::post('/patient', [PatientController::class, 'create'])->name('create.patient');
                  Route::post('/patient', [PatientController::class, 'show'])->name('show.patient');
                  Route::post('/patient', [PatientController::class, 'update'])->name('update.patient');
                  Route::post('/patient', [PatientController::class, 'delete'])->name('delete.patient');


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