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
        Schema::create('admins', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name', 225);
            $table->string('email', 225)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 225);
            $table->string('phone_no', 225);
            $table->enum('role', ['admin', 'super_admin']);
            $table->enum('status', ['active', 'inactive', 'suspended']);
            $table->rememberToken();
            $table->timestamps();
            $table->index(['email', 'status'], 'idx_admin_email_status');
            $table->index(['name', 'email'], 'idx_admin_name_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
