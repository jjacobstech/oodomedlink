<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/app/db/migrate', function () {

      Artisan::call('migrate', ['--force' => true]);

      return response()->json([
            'message' => 'Migration completed successfully',
            'output' => Artisan::output()
      ]);
});

Route::get('/app/system/install', function () {

      Artisan::call('app:install-dependencies');
      $output = Artisan::output();

      return response()->json([
            'success' => true,
            'message' => 'Dependencies installed successfully',
            'output' => json_encode($output, true)
      ]);
});