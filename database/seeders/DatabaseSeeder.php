<?php

namespace Database\Seeders;

use App\Models\Clinic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Clinic::factory()->create([
            'name' => 'Jak Clinic',
            'email' => 'jacobsjoshua81@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('123456789'),
            'phone_no' => '07085984899',
            'address' => '13, ambrose street',
            'state' => 'lagos',
            'country' => 'nigeria',
            'status' => 'active'
        ]);
    }
}