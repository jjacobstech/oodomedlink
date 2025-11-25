<?php
// routes/system.php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Request;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

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
});

// In RouteServiceProvider or bootstrap/app.php, add rate limiter
// RateLimiter::for('system', function (Request $request) {
//       return Limit::perMinute(5)->by($request->ip());
// });