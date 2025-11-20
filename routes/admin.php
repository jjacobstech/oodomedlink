<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Auth\Admin\PasswordController;
use App\Http\Controllers\Auth\Admin\NewPasswordController;
use App\Http\Controllers\Auth\Admin\RegisteredAdminController;
use App\Http\Controllers\Auth\Admin\EmailVerificationController;
use App\Http\Controllers\Auth\Admin\PasswordResetLinkController;
use App\Http\Controllers\Auth\Admin\ConfirmablePasswordController;
use App\Http\Controllers\Auth\Admin\AuthenticatedSessionController;

Route::prefix('admin')->group(function () {

      Route::middleware('guest:admin')->group(function () {

            Route::get('/', function () {
                  return  redirect(route('admin.login'));
            });

            Route::middleware('isAuth')->group(function () {
                  Route::get('signup', [RegisteredAdminController::class, 'create'])
                        ->name('admin.signup');

                  Route::get('login', [AuthenticatedSessionController::class, 'create'])
                        ->name('admin.login');
            });

            Route::post('signup', [RegisteredAdminController::class, 'store']);

            Route::post('login', [AuthenticatedSessionController::class, 'store']);

            Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
                  ->name('admin.password.request');

            Route::post('forgot-password', [PasswordResetLinkController::class, 'send'])
                  ->name('admin.password.request.otp');

            Route::post('forgot-password/verify', [PasswordResetLinkController::class, 'verify'])
                  ->name('admin.password.verify');

            Route::post('reset-password', [NewPasswordController::class, 'reset'])
                  ->name('admin.password.reset');
      });


      Route::middleware('guest:admin')->group(function () {
            Route::post('send-otp', [EmailVerificationController::class, 'send'])
                  ->name('admin.send.otp');

            Route::post('verify-email', [EmailVerificationController::class, 'verify'])
                  ->middleware(['throttle:6,1'])
                  ->name('admin.verify.otp');
      });


      Route::middleware('isAdmin')->group(function () {

            Route::middleware('auth:admin')->group(function () {

                  Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                        ->name('admin.password.confirm');

                  Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

                  Route::put('password', [PasswordController::class, 'update'])->name('admin.password.update');

                  Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                        ->name('admin.logout');
            });

            Route::get('/dashboard', [DashboardController::class, 'dashboard'])->middleware(['auth:admin', 'verified'])->name('admin.dashboard');

            Route::get('/settings', function () {
                  return Inertia::render('Admin/Settings');
            })->middleware(['auth:admin', 'verified'])->name('admin.settings');
      });
});