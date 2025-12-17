<?php

namespace App\Jobs;

use App\Classes\Data;
use App\Models\Clinic;
use App\Models\Patient;
use App\Models\WhatsappMessage;
use Illuminate\Support\Facades\Log;
use App\Helpers\PhoneNumberFormatter;
use Illuminate\Queue\SerializesModels;
use Illuminate\Notifications\Notifiable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Actions\Messaging\WhatsappMessaging;

class MessagingJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, Notifiable;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 5;

    /**
     * The number of seconds the job can run before timing out.
     *
     * @var int
     */
    public $timeout = 120;

    /**
     * Delete the job if its models no longer exist.
     *
     * @var bool
     */
    public $deleteWhenMissingModels = true;

    public string $subject;
    public mixed $recipient;
    public array $attachments;
    public string $notes;
    public ?string $whatsappMessagingId;
    public Clinic $clinic;

    /**
     * Create a new job instance.
     */
    public function __construct(
        string $subject,
        Patient $recipient,
        array $attachments,
        string $notes,
        string $whatsappMessagingId,
        Clinic $clinic
    ) {
        $this->subject = $subject;
        $this->recipient = $recipient;
        $this->attachments = $attachments;
        $this->notes = $notes;
        $this->whatsappMessagingId = $whatsappMessagingId;
        $this->clinic = $clinic;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $whatsappMessaging = null;

        // Find the email delivery record if ID provided
        if ($this->whatsappMessagingId) {
            $whatsappMessaging = WhatsappMessage::find($this->whatsappMessagingId);

            if (!$whatsappMessaging) {
                Log::warning("Messaging Delivery record not found: {$this->whatsappMessagingId}");
                return;
            }

            // Check if already sent
            if ($whatsappMessaging->status === 'sent') {
                Log::info("Message already sent, skipping: {$this->whatsappMessagingId}");
                return;
            }

            // Update status to pending with delivery attempt
            $whatsappMessaging->update([
                'status' => 'pending',
                'delivery_attempts' => $whatsappMessaging->delivery_attempts + 1,
            ]);
        }

        try {
            // Send the message
            $data = new Data(
                $this->recipient->full_name,
                $this->clinic->name,
                $this->clinic->email,
                $this->clinic->phone_no,
                $this->attachments
            );

            $messaging = new WhatsappMessaging();
            $phoneNo = PhoneNumberFormatter::toInternational($this->recipient->phone_no);
            $messaging->sendMessage($phoneNo, null, $data);


            // Update status to sent on success
            if ($whatsappMessaging) {
                $whatsappMessaging->update([
                    'status' => 'sent',
                    'sent_at' => now(),
                    'error_message' => null,
                ]);
            }

            Log::info("Email sent successfully to {$this->recipient->email}", [
                'subject' => $this->subject,
                'email_delivery_id' => $this->whatsappMessagingId,
                'attempt' => $this->attempts(),
            ]);
        } catch (\Exception $e) {
            // Log the error
            Log::error("Failed to send messaging to {$this->recipient->phone_no}", [
                'error' => $e->getMessage(),
                'subject' => $this->subject,
                'email_delivery_id' => $this->whatsappMessagingId,
                'attempt' => $this->attempts(),
                'max_tries' => $this->tries,
            ]);

            if ($whatsappMessaging && $this->attempts() >= $this->tries) {
                $whatsappMessaging->update([
                    'status' => 'failed',
                    'error_message' => $e->getMessage(),
                ]);
            }

            // Re-throw the exception to trigger retry mechanism
            throw $e;
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        // Update the email delivery record to failed status
        if ($this->whatsappMessagingId) {
            $whatsappMessaging = WhatsappMessage::find($this->whatsappMessagingId);

            if ($whatsappMessaging) {
                $whatsappMessaging->update([
                    'status' => 'failed',
                    'error_message' => $exception->getMessage(),
                ]);
            }
        }

        Log::error("ResultJob failed permanently for {$this->recipient->phone_no}", [
            'error' => $exception->getMessage(),
            'trace' => $exception->getTraceAsString(),
            'subject' => $this->subject,
            'email_delivery_id' => $this->whatsappMessagingId,
            'total_attempts' => $this->attempts(),
        ]);
    }

    /**
     * Calculate the number of seconds to wait before retrying the job.
     *
     * @return array<int, int>
     */
    public function backoff(): array
    {
        // Exponential backoff: 1 minute, 5 minutes, 10 minutes
        return [60, 300, 600];
    }
}
