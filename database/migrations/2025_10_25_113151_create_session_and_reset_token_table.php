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

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('email');
            $table->string('token');
            $table->timestamp('created_at')->nullable();
            $table->index(['email', 'token'], 'idx_email_token');
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
            $table->index(['user_id', 'ip_address'], 'idx_user_id_ip_address');
            $table->index(['ip_address', 'last_activity'], 'idx_ip_address_last_activity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
