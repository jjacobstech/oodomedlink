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
        Schema::create('patient_results', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('clinic_id');
            $table->uuid('patient_id')->nullable();
            $table->string('result_type', 225);
            $table->string('test_name', 225);
            $table->dateTime('test_date');
            $table->json('data')->nullable();
            $table->boolean('encrypted')->default(true);
            $table->longText('notes')->nullable();
            $table->enum('status', ['pending', 'processed', 'sent', 'archived'])->default('pending');
            $table->timestamp('uploaded_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->default(now());

            $table->foreign('clinic_id')->on('clinics')->references('id')->cascadeOnDelete();
            $table->foreign('patient_id')->on('patients')->references('id')->cascadeOnDelete();

            $table->index(['patient_id'], 'idx_patient_id');
            $table->index(['clinic_id'], 'idx_clinic_id');
            $table->index(['status'], 'idx_patient_result_status');
            $table->index(['test_date'], 'idx_test_date');


            $table->index(['patient_id', 'clinic_id'], 'idx_patient_id_clinic_id');
            $table->index(['patient_id', 'clinic_id', 'test_date'], 'idx_patient_id_clinic_id_test_date');
            $table->index(['patient_id', 'clinic_id', 'status'], 'idx_patient_id_clinic_id_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_results');
    }
};