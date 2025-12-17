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
        Schema::create('whatsapp_messages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('patient_result_id');
            $table->uuid('patient_id'); // Add patient_id foreign key
            $table->string('patient_email', 225);
            $table->uuid('sent_by');
            $table->string('subject', 225);
            $table->longText('body')->nullable();
            $table->enum('status', ['sent', 'pending', 'failed', 'bounced', 'scheduled'])->default('pending');
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('scheduled_at')->nullable();
            $table->integer('delivery_attempts')->default(0);
            $table->longText('error_message')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Foreign keys
            $table->foreign('patient_result_id')->references('id')->on('patient_results')->onDelete('cascade');
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->foreign('sent_by')->references('id')->on('clinics')->onDelete('cascade');

            // Indexes
            $table->index('patient_result_id', 'idx_whatsapp_messages_patient_result_id');
            $table->index('patient_id', 'idx_whatsapp_messages_patient_id');
            $table->index('status', 'idx_whatsapp_messages_status');
            $table->index('sent_at', 'idx_whatsapp_messages_sent_at');
            $table->index(['patient_result_id', 'patient_email'], 'idx_patient_result_id_patient_email');
            $table->index(['patient_result_id', 'patient_email', 'status'], 'idx_patient_result_id_patient_email_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('whatsapp_messages');
    }
};
