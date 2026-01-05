<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatBotController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Clinics\EmailController;
use App\Http\Controllers\Clinics\ResultsController;
use App\Http\Controllers\Clinics\PatientsController;
use App\Http\Controllers\Clinics\SettingsController;
use App\Http\Controllers\Clinics\DashboardController;
use App\Http\Controllers\Clinics\NotificationController;

Route::prefix('clinic')->middleware(['auth:clinic'])->name('user.')->group(function () {

      Route::middleware(['verified'])->group(
            function () {

                  Route::get("/dashboard",  [DashboardController::class, 'index'])->name('dashboard');

                  Route::get('/emails', [EmailController::class, 'index'])->name('emails');

                  Route::get('/patients', [PatientsController::class, 'index'])->name('patients');
                  Route::controller(PatientsController::class)->prefix('patients')->name('patients.')->group(function () {
                        Route::get('/create', 'create')->name('create');
                        Route::post('/', 'store')->name('store');
                        Route::get('/{patient}', 'show')->name('show');
                        Route::get('/{patient}/edit', 'edit')->name('edit');
                        Route::put('/{patient}', 'update')->name('update');
                        Route::delete('/{patient}', 'destroy')->name('destroy');
                  });


                  Route::get('/settings', function () {

                        return Inertia::render('User/Settings', [
                              'user' => Auth::user(),
                        ]);
                  })->name('settings');
            }
      );

      Route::prefix('profile')->name('profile.')->group(function () {
            Route::get('/', [SettingsController::class, 'edit'])->name('edit');
            Route::post('/update', [SettingsController::class, 'update'])->name('update');
            Route::delete('/avatar', [SettingsController::class, 'deleteAvatar'])->name('avatar.delete');
      });

      Route::prefix('result')->group(function () {
            Route::post("/fetch",  [DashboardController::class, 'fetchDashboard'])->name('fetch.dashboard');
            Route::post('/', [ResultsController::class, 'index'])->name('result');
            Route::post('upload', [ResultsController::class, 'upload'])->name('result.upload');
            Route::post('send', [ResultsController::class, 'send'])->name('result.send');
            Route::post('/user/emails/{email}/retry', [EmailController::class, 'retry'])
                  ->name('emails.retry');

            Route::post('/summarize', [ResultsController::class, 'summarizeResult'])
                  ->name('result.summarize');
      });

      Route::prefix('/email')->group(function () {

            Route::post('retry', [EmailController::class, 'retry'])
                  ->name('email.retry');
      });

      // Mark single notification as read
      Route::post('/notifications/mark-as-read', [NotificationController::class, 'markAsRead'])
            ->name('notification');

      // Mark all notifications as read
      Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])
            ->name('notifications.mark-all-read');

      // Get all notifications (paginated)
      Route::get('/notifications', [NotificationController::class, 'index'])
            ->name('notifications.index');

      // Delete a notification
      Route::delete('/notifications/{id}', [NotificationController::class, 'destroy'])
            ->name('notifications.destroy');

      // Clear all read notifications
      Route::delete('/notifications/clear-read', [NotificationController::class, 'clearRead'])
            ->name('notifications.clear-read');

      // Get notification count
      Route::get('/notifications/count', [NotificationController::class, 'getCount'])
            ->name('notifications.count');

      Route::post('/ocr/send', [ResultsController::class, 'sendToOcr'])
            ->name('result.check');


      Route::post('/chat', [ChatBotController::class, 'index'])->name('chat');
});