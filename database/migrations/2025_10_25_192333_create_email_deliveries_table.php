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
        Schema::create('email_deliveries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('patient_result_id')->references('id')->on('patient_results')->cascadeOnDelete();
            $table->string('patient_email', 225)->references('email')->on('patients')->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('sent_by', 225);
            $table->string('subject', 225);
            $table->longText('body');
            $table->enum('status', ['sent', 'pending', 'failed', 'bounced'])->default('pending');
            $table->timestamp('sent_at');
            $table->integer('delivery_attempts')->default(0);
            $table->longText('error_message')->nullable();
            $table->timestamps();

            $table->index('patient_result_id', 'idx_email_deliveries_patient_result_id');
            $table->index('status', 'idx_email_deliveries_status');
            $table->index('sent_at', 'idx_email_deliveries_sent_at');
            $table->index(['patient_result_id', 'patient_email'], 'idx_patient_result_id_patient_email');
            $table->index(['patient_result_id', 'patient_email', 'status'], 'idx_patient_result_id_patient_email_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('email_deliveries');
    }
};