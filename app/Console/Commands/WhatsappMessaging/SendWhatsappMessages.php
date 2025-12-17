<?php

namespace App\Console\Commands\WhatsappMessaging;

use Carbon\Carbon;
use App\Models\File;
use App\Classes\Data;
use App\Models\Clinic;
use App\Models\WhatsappMessage;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Helpers\PhoneNumberFormatter;
use App\Notifications\WhatsappNotification;
use App\Actions\Messaging\WhatsappMessaging;

class SendWhatsappMessages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'messaging:send-messages  {--limit=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send scheduled messages';

    /**
     * Execute the console command.
     */
    public function handle()
    {


        $limit = $this->option('limit') ?? config('messaging.whatsapp.message.message_processes_limit', 50);
        $attempts = config('messaging.whatsapp.message.max_delivery_attempts');

        // Get messages that are scheduled to be sent now or earlier
        $scheduledMessages = WhatsappMessage::where('status', 'scheduled')
            ->with([
                'patient:id,full_name,phone_no',
                'result:id'
            ])
            ->where('scheduled_at', '<=', Carbon::now())
            ->whereNull('sent_at')
            // Skip messages that have failed too many times
            ->where('delivery_attempts', '<', $attempts)
            ->limit($limit)
            ->get();

        if ($scheduledMessages->isEmpty()) {
            $this->info('No scheduled messages to send');
            return 0;
        }

        $this->info("Processing {$scheduledMessages->count()} scheduled messages...");

        $sent = 0;
        $failed = 0;



        // Pre-load clinics to avoid N+1 queries
        $clinicId = $scheduledMessages->pluck('sent_by')->unique();
        $clinics = Clinic::whereIn('id', $clinicId)->get()->keyBy('id');

        foreach ($scheduledMessages as $message) {

            Log::debug('info: ', [$message->result]);
            try {


                // Get clinic from pre-loaded collection
                $clinic = $clinics->get($message->sent_by);


                if (!$clinic) {
                    throw new \Exception("Clinic '{$message->sent_by}' not found");
                }

                // Validate patient message
                if (empty($message->patient->phone_no)) {
                    throw new \Exception("Recipient message is empty");
                }

                // Get file paths - more efficient query
                $file_urls = File::where('result', $message->patient_result_id)
                    ->pluck('file_url')
                    ->toArray();

                // Send the message
                $data = new Data(
                    $message->patient->full_name,
                    $clinic->name,
                    $clinic->email,
                    $clinic->phone_no,
                    $file_urls
                );

                $messaging = new WhatsappMessaging();
                $phoneNo = PhoneNumberFormatter::toInternational($message->patient->phone_no);
                $isMessageSent = $messaging->sendMessage($phoneNo, null, $data);


                // Update status to sent on success
                if ($isMessageSent) {
                    $message->update([
                        'status' => 'sent',
                        'sent_at' => now(),
                        'error_message' => null,
                    ]);
                }



                // Mark as sent - use direct update for efficiency
                $message->update([
                    'status' => 'sent',
                    'sent_at' => Carbon::now(),
                    'error_message' => null, // Clear any previous errors
                    'delivery_attempts' => $message->delivery_attempts + 1,
                ]);


                Log::info("Message sent successfully to {$message->patient->phone_no}", [
                    'subject' => $message->subject,
                    'message_delivery_id' => $message->id,
                    'attempt' => $message->delivery_attempts + 1,
                ]);

                $notification = "Message scheduled for {$message->scheduled_at} to {$message->patient->full_name} has been sent.";

                $clinic->notify(new WhatsappNotification($notification));

                $sent++;
                $this->info("✓ Sent message to: {$message->patient->phone_no} for {$message->patient->full_name}");
            } catch (\Exception $e) {
                $failed++;

                // Log the error with context
                Log::error('Failed to send scheduled message', [
                    'message_id' => $message->id,
                    'recipient' => $message->patient,
                    'patient' => $message->patient->full_name ?? 'Unknown',
                    'error' => $e->getMessage(),
                    'attempt' => $message->delivery_attempts + 1,
                ]);

                $this->error("✗ Failed to send message ID {$message->id}: " . $e->getMessage());

                // Update error status
                $newAttempts = $message->delivery_attempts + 1;

                $message->update([
                    'error_message' => $e->getMessage(),
                    'delivery_attempts' => $newAttempts,
                    // Mark as failed after 3 attempts
                    'status' => $newAttempts >= $attempts ? 'failed' : 'scheduled',
                ]);

                // If reached max attempts, log it prominently
                if ($newAttempts >= $attempts) {
                    $this->warn("Message ID {$message->id} marked as FAILED after {$newAttempts} attempts");
                }
            }
        }

        // Summary
        $this->newLine();
        $this->info("========================================");
        $this->info("Message Processing Summary:");
        $this->info("Successfully sent: {$sent}");
        if ($failed > 0) {
            $this->warn("Failed: {$failed}");
        }
        $this->info("========================================");

        return 0;
    }
}
