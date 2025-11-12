<?php

use App\Models\Clinic;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
beforeAll(function () {
    Artisan::call('migrate');
});

test('user login screen can be rendered', function () {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

test('user register screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('user can register', function () {
    $data = [
        'clinic_name' => 'Pharmzo Clinic',
        'email' => 'pharmzo@gmail.com',
        'password' => '123456789',
        'password_confirmation' => '123456789',
        'phone_no' => '07086589332',
        'address' => '10 adekunle street, ayobo',
        'state' => 'lagos',
        'country' => 'nigeria'
    ];

    $response = $this->post('/register', $data);

    expect(Clinic::where('email', $data['email'])->exists())->toBe(true);
    $response->assertStatus(302);
    $response->assertRedirect('/dashboard');
    $this->assertAuthenticated();
});

test('user can login', function () {

    $clinic = Clinic::create([
        'name' => 'Pharmzo Clinic',
        'email' => 'pharmzo@gmail.com',
        'password' => bcrypt('123456789'),
        'phone_no' => '07086589332',
        'address' => '10 adekunle street, ayobo',
        'state' => 'lagos',
        'country' => 'nigeria',
        'status' => 'active'
    ]);

    $data = [
        "email" =>  "pharmzo@gmail.com",
        "password" =>  "123456789"
    ];

    expect(Clinic::where('email', $data['email'])->exists())->toBe(true);

    $response = $this->post('/login', $data);

    $response->assertStatus(302);
    $response->assertRedirect('/dashboard');
    $this->assertAuthenticated();
});
