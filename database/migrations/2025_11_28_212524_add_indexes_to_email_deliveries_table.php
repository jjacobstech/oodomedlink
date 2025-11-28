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
        Schema::table('email_deliveries', function (Blueprint $table) {
            $table->index(['status', 'scheduled_at', 'sent_at']);
            $table->index(['delivery_attempts']);
            $table->index(['sent_by']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('email_deliveries', function (Blueprint $table) {
            //
        });
    }
};
