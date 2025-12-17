<?php

namespace App\Console\Commands\Email;

use Carbon\Carbon;
use App\Models\EmailDelivery;
use Illuminate\Console\Command;

class RetryFailedEmails extends Command
{
    protected $signature = 'emails:retry-failed {--all}';
    protected $description = 'Retry failed emails that are older than configured hours';

    public function handle()
    {
        $retryAfterHours = config('mail.retry_failed_after_hours', 24);

        $query = EmailDelivery::where('status', 'failed');

        if (!$this->option('all')) {
            // Only retry emails older than X hours
            $query->where('updated_at', '<=', Carbon::now()->subHours($retryAfterHours));
        }

        $failedEmails = $query->get();

        if ($failedEmails->isEmpty()) {
            $this->info('No failed emails to retry');
            return 0;
        }

        $this->info("Resetting {$failedEmails->count()} failed emails...");

        foreach ($failedEmails as $email) {
            $email->update([
                'status' => 'scheduled',
                'delivery_attempts' => 0,
                'error_message' => null,
                'scheduled_at' => Carbon::now(), // Send immediately
            ]);
        }

        $this->info("✓ Reset {$failedEmails->count()} failed emails for retry");

        return 0;
    }
}
