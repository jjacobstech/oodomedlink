<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/mail', function () {

    return view('mail.email-verification');
});

Route::get('/terms-and-conditions', function () {

    return Inertia::render('TermsAndConditions');
})->name('terms-and-conditions');

Route::get('/blog', function () {

    return Inertia::render('Blog');
})->name('blog');

Route::get('/help-center', function () {

    return Inertia::render('FAQ');
})->name('faq');

require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/clinic.php';
require __DIR__ . '/system.php';