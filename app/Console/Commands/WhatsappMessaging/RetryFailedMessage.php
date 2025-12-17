<?php

namespace App\Console\Commands\WhatsappMessaging;

use App\Models\WhatsappMessage;
use Carbon\Carbon;
use Illuminate\Console\Command;

class RetryFailedMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'messaging:retry-failed {--all}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Retry failed messages that are older than configured hours';

    /**
     * Execute the console command.
     */


    public function handle()
    {
        $retryAfterHours = config('whatsapp.message.retry_failed_after_hours', 24);

        $query = WhatsappMessage::where('status', 'failed');

        if (!$this->option('all')) {
            $query->where('updated_at', '<=', Carbon::now()->subHours($retryAfterHours));
        }

        $failedMessages = $query->get();

        if ($failedMessages->isEmpty()) {
            $this->info('No failed messages to retry');
            return 0;
        }

        $this->info("Resetting {$failedMessages->count()} failed messages...");

        foreach ($failedMessages as $messages) {
            $messages->update([
                'status' => 'scheduled',
                'sent_at' => null,
                'delivery_attempts' => 0,
                'error_message' => null,
                'scheduled_at' => Carbon::now(), // Send immediately
            ]);
        }

        $this->info("✓ Reset {$failedMessages->count()} failed messages for retry");

        return 0;
    }
}
