<?php

namespace App\Console\Commands\Email;

use App\Models\EmailDelivery;
use Illuminate\Console\Command;
use Carbon\Carbon;

class EmailHealthCheck extends Command
{
    protected $signature = 'emails:health';
    protected $description = 'Check email delivery health statistics';

    public function handle()
    {
        $this->info("========================================");
        $this->info("Email Delivery Health Report");
        $this->info("========================================");

        // Pending
        $pending = EmailDelivery::where('status', 'scheduled')
            ->whereNull('sent_at')
            ->count();
        $this->info("Pending: {$pending}");

        // Sent today
        $sentToday = EmailDelivery::where('status', 'sent')
            ->whereDate('sent_at', Carbon::today())
            ->count();
        $this->info("Sent today: {$sentToday}");

        // Failed
        $failed = EmailDelivery::where('status', 'failed')->count();
        if ($failed > 0) {
            $this->warn("Failed: {$failed}");
        } else {
            $this->info("Failed: {$failed}");
        }

        // Overdue
        $overdue = EmailDelivery::where('status', 'scheduled')
            ->where('scheduled_at', '<', Carbon::now()->subHours(1))
            ->whereNull('sent_at')
            ->count();
        if ($overdue > 0) {
            $this->error("⚠ Overdue (>1hr late): {$overdue}");
        }

        $this->info("========================================");

        return 0;
    }
}
