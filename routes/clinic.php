<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Clinics\EmailController;
use App\Http\Controllers\Clinics\ResultsController;
use App\Http\Controllers\Clinics\DashboardController;
use App\Http\Controllers\Clinics\PatientsController;

Route::prefix('clinic')->middleware(['auth:clinic'])->name('user.')->group(function () {
      Route::middleware(['verified'])->group(
            function () {

                  Route::get("/dashboard",  [DashboardController::class, 'index'])->name('dashboard');

                  Route::get('/emails', [EmailController::class, 'index'])->name('emails');

                  Route::controller(PatientsController::class)->prefix('patients')->group(function () {
                        Route::get('/', 'index')->name('patients');
                        Route::get('/create', 'create')->name('patients.create');
                        Route::post('/', 'store')->name('patients.store');
                        Route::get('/{patient}', 'show')->name('patients.show');
                        Route::get('/{patient}/edit', 'edit')->name('patients.edit');
                        Route::put('/{patient}', 'update')->name('patients.update');
                        Route::delete('/{patient}', 'destroy')->name('patients.destroy');
                  });


                  Route::get('/settings', function () {

                        return Inertia::render('User/Settings', [
                              'user' => Auth::user(),
                        ]);
                  })->name('settings');
            }
      );

      Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
      Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
      Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

      Route::prefix('result')->group(function () {
            Route::post("/fetch",  [DashboardController::class, 'fetchDashboard'])->name('fetch.dashboard');
            Route::post('/', [ResultsController::class, 'index'])->name('result');
            Route::post('upload', [ResultsController::class, 'upload'])->name('result.upload');
            Route::post('send', [ResultsController::class, 'send'])->name('result.send');
            Route::post('/user/emails/{email}/retry', [EmailController::class, 'retry'])
                  ->name('emails.retry');
      });

      Route::prefix('/email')->group(function () {

            Route::post('retry', [EmailController::class, 'retry'])
                  ->name('email.retry');
      });
});