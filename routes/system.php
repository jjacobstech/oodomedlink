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
});

// In RouteServiceProvider or bootstrap/app.php, add rate limiter
// RateLimiter::for('system', function (Request $request) {
//       return Limit::perMinute(5)->by($request->ip());
// });