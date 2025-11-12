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
        Schema::create('clinics', function (Blueprint $table) {

            $table->uuid('id')->primary();
            $table->string('name', 225);
            $table->string('email', 225)->unique();
            $table->string('avatar', 225)->nullable();
            $table->string('staff_no')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 225);
            $table->string('phone_no', 225);
            $table->longText('address');
            $table->string('state', 225);
            $table->string('country', 225);
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->rememberToken();
            $table->timestamps();

            $table->index(['email', 'status'], 'idx_email_status');
            $table->index(['state', 'country'], 'idx_state_country');
            $table->index(['name', 'email'], 'idx_name_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinics');
    }
};
