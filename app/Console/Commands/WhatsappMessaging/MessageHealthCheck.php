<?php

namespace App\Console\Commands\WhatsappMessaging;

use Carbon\Carbon;
use App\Models\WhatsappMessage;
use Illuminate\Console\Command;

class MessageHealthCheck extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'messaging:health-check';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check messaging delivery health statistics';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info("========================================");
        $this->info("Whatsapp Delivery Health Report");
        $this->info("========================================");

        // Pending
        $pending = WhatsappMessage::where('status', 'scheduled')
            ->whereNull('sent_at')
            ->count();
        $this->info("Pending: {$pending}");

        // Sent today
        $sentToday = WhatsappMessage::where('status', 'sent')
            ->whereDate('sent_at', Carbon::today())
            ->count();
        $this->info("Sent today: {$sentToday}");

        // Failed
        $failed = WhatsappMessage::where('status', 'failed')->count();
        if ($failed > 0) {
            $this->warn("Failed: {$failed}");
        } else {
            $this->info("Failed: {$failed}");
        }

        // Overdue
        $overdue = WhatsappMessage::where('status', 'scheduled')
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
