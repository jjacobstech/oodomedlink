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