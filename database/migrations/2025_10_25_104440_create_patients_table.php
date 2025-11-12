<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(
            'patients',
            function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('clinic_id', 100);
                $table->string('full_name', 225);
                $table->string('email', 225);
                $table->string('phone_no', 225);
                $table->date('date_of_birth');
                $table->enum('gender', ['male', 'female', 'other']);
                $table->longText('address');
                $table->timestamps();
                $table->index(['clinic_id', 'email'], 'idx_clinic_id_email');
                $table->index(['full_name', 'patient_id'], 'idx_full_name_patient_id');
            }

        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
