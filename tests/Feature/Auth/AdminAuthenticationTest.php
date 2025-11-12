<?php

use App\Models\Admin;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
beforeAll(function () {
      Artisan::call('migrate');
});

test('admin login screen can be rendered', function () {
      $response = $this->get('/admin/login');

      $response->assertStatus(200);
});

test('admin register screen can be rendered', function () {
      $response = $this->get('/admin/register');

      $response->assertStatus(200);
});

test('admin can register', function () {
      $data = [
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => '123456789',
            'password_confirmation' => '123456789',
            'phone_no' => '07086589332',
            'role' => 'admin'
      ];

      $response = $this->post('/admin/register', $data);

      expect(Admin::where('email', $data['email'])->exists())->toBe(true);
      $response->assertStatus(302);
      $response->assertRedirect('/admin/dashboard');
      $this->assertAuthenticated();
});

test('admin can login', function () {

      Admin::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => '123456789',
            'password_confirmation' => '123456789',
            'phone_no' => '07086589332',
            'role' => 'admin'
      ]);

      $data = [
            "email" =>  "admin@gmail.com",
            "password" =>  "123456789"
      ];

      expect(Admin::where('email', $data['email'])->exists())->toBe(true);

      $response = $this->post('/admin/login', $data);

      $response->assertStatus(302);
      $response->assertRedirect('/admin/dashboard');
      $this->assertAuthenticated();
});
