<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;

Route::prefix('clinics')->middleware(['guest', 'isAuth', 'throttle:10,1'])->group(function () {
    Route::get('signup', [RegisteredUserController::class, 'create'])
        ->name('signup');
    Route::post('signup', [RegisteredUserController::class, 'store']);
    Route::post('login', [AuthenticatedSessionController::class, 'store']);


    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'send'])
        ->name('password.request.otp');

    Route::post('forgot-password/verify', [PasswordResetLinkController::class, 'verify'])
        ->name('password.verify');

    Route::post('reset-password', [NewPasswordController::class, 'reset'])
        ->name('password.reset');
});


Route::prefix('clinics')->middleware(['guest'])->group(function () {
    Route::post('send-otp', [EmailVerificationController::class, 'send'])
        ->name('send.otp');

    Route::post('verify-email', [EmailVerificationController::class, 'verify'])
        ->name('verify.otp');
});

Route::prefix('clinics')->middleware('auth:clinic')->group(function () {

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store'])->middleware('throttle:6,1');

    Route::put('password', [PasswordController::class, 'update'])->name('password.update')->middleware('throttle:6,1');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});