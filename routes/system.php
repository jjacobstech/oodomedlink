<?php
// routes/system.php

use App\Mail\ResultMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Request;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\Mailer\Transport\Smtp\SmtpTransport;

Route::middleware(['throttle:6,1'])->prefix('system')->group(function () {

      Route::get('/optimize', function () {
            // Additional rate limiting per IP
            if (RateLimiter::tooManyAttempts('optimize:' . request()->ip(), 3)) {
                  return response()->json([
                        'success' => false,
                        'message' => 'Too many requests. Please try again later.'
                  ], 429);
            }

            RateLimiter::hit('optimize:' . request()->ip(), 3600); // 1 hour

            Artisan::call('optimize');

            return response()->json([
                  'success' => true,
                  'message' => 'Application optimized successfully',
                  'output' => Artisan::output()
            ]);
      })->name('system.optimize');

      Route::get('/optimize/clear', function () {
            if (RateLimiter::tooManyAttempts('optimize-clear:' . request()->ip(), 5)) {
                  return response()->json([
                        'success' => false,
                        'message' => 'Too many requests. Please try again later.'
                  ], 429);
            }

            RateLimiter::hit('optimize-clear:' . request()->ip(), 3600);

            Artisan::call('optimize:clear');

            return response()->json([
                  'success' => true,
                  'message' => 'Caches cleared successfully',
                  'output' => Artisan::output()
            ]);
      })->name('system.optimize.clear');

      Route::get('/db/migrate', function () {
            if (RateLimiter::tooManyAttempts('db-migrate:' . request()->ip(), 5)) {
                  return response()->json([
                        'success' => false,
                        'message' => 'Too many requests. Please try again later.'
                  ], 429);
            }

            RateLimiter::hit('db-migrate:' . request()->ip(), 3600);

            Artisan::call('migrate');

            return response()->json([
                  'success' => true,
                  'message' => 'Migration successful',
                  'output' => Artisan::output()
            ]);
      })->name('db.migrate.force');

      Route::get('/db/migrate/fresh', function () {
            if (RateLimiter::tooManyAttempts('db-migrate-fresh:' . request()->ip(), 5)) {
                  return response()->json([
                        'success' => false,
                        'message' => 'Too many requests. Please try again later.'
                  ], 429);
            }

            RateLimiter::hit('db-migrate-fresh:' . request()->ip(), 3600);

            Artisan::call('migrate:fresh');

            return response()->json([
                  'success' => true,
                  'message' => 'Migration successful',
                  'output' => Artisan::output()
            ]);
      })->name('db.migrate.fresh');

      Route::get('/test-mail', function () {

            $recipient = (object) [
                  'id' => 42,
                  'full_name' => 'Jacobs Joshua',
                  'email' => 'jacobsjoshua81@gmail.com',
            ];

            $clinic = (object) [
                  'id' => 7,
                  'name' => 'central medical clinic',
                  'email' => 'info@centralclinic.com',
                  'phone_no' => '+234 801 234 5678',
            ];
            try {
                  Mail::to($recipient->email)->send(
                        new ResultMail(
                              $recipient,
                              'Test Mail',
                              [],
                              'test',
                              $clinic
                        )
                  );

                  return 'Email sent!';
            } catch (\Exception $e) {
                  return 'Error: ' . $e->getMessage();
            }
      });
});
