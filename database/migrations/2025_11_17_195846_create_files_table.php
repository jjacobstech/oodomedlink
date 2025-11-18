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
        Schema::create('files', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('result');
            $table->string('file_name', 225);
            $table->string('file_url', 225);
            $table->string('file_path', 225);
            $table->string('file_type', 225);
            $table->bigInteger('file_size');
            $table->string('original_file_name', 225);
            $table->foreign('result')->on('patient_results')->references('id')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
