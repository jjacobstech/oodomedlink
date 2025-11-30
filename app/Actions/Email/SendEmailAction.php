<?php

namespace App\Actions\Email;

use App\Models\Clinic;
use App\Mail\ResultMail;
use App\Models\EmailDelivery;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Notifications\Notifiable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendEmailAction
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
    public ?string $emailDeliveryId;
    public Clinic $clinic;

    /**
     * Create a new job instance.
     */
    public function __construct(
        string $subject,
        mixed $recipient,
        array $attachments,
        string $notes,
        string $emailDeliveryId,
        Clinic $clinic
    ) {
        $this->subject = $subject;
        $this->recipient = $recipient;
        $this->attachments = $attachments;
        $this->notes = $notes;
        $this->emailDeliveryId = $emailDeliveryId;
        $this->clinic = $clinic;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        $emailDelivery = null;

        // Find the email delivery record if ID provided
        if ($this->emailDeliveryId) {
            $emailDelivery = EmailDelivery::find($this->emailDeliveryId);

            if (!$emailDelivery) {
                Log::warning("EmailDelivery record not found: {$this->emailDeliveryId}");
                return;
            }

            // Check if already sent
            if ($emailDelivery->status === 'sent') {
                Log::info("Email already sent, skipping: {$this->emailDeliveryId}");
                return;
            }

            // Update status to pending with delivery attempt
            $emailDelivery->update([
                'status' => 'pending',
                'delivery_attempts' => $emailDelivery->delivery_attempts + 1,
            ]);
        }

        try {
            // Send the email
            Mail::to($this->recipient->email)->send(
                new ResultMail(
                    $this->recipient,
                    $this->subject,
                    $this->attachments,
                    $this->notes,
                    $this->clinic,
                )
            );

            // Update status to sent on success
            if ($emailDelivery) {
                $emailDelivery->update([
                    'status' => 'sent',
                    'sent_at' => now(),
                    'error_message' => null,
                ]);
            }

            Log::info("Email sent successfully to {$this->recipient->email}", [
                'subject' => $this->subject,
                'email_delivery_id' => $this->emailDeliveryId,
                'attempt' => $this->attempts(),
            ]);
        } catch (\Exception $e) {
            // Log the error
            Log::error("Failed to send email to {$this->recipient->email}", [
                'error' => $e->getMessage(),
                'subject' => $this->subject,
                'email_delivery_id' => $this->emailDeliveryId,
                'attempt' => $this->attempts(),
                'max_tries' => $this->tries,
            ]);

            // Update status to failed if this is the last attempt
            if ($emailDelivery && $this->attempts() >= $this->tries) {
                $emailDelivery->update([
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
        if ($this->emailDeliveryId) {
            $emailDelivery = EmailDelivery::find($this->emailDeliveryId);

            if ($emailDelivery) {
                $emailDelivery->update([
                    'status' => 'failed',
                    'error_message' => $exception->getMessage(),
                ]);
            }
        }

        Log::error("ResultJob failed permanently for {$this->recipient->email}", [
            'error' => $exception->getMessage(),
            'trace' => $exception->getTraceAsString(),
            'subject' => $this->subject,
            'email_delivery_id' => $this->emailDeliveryId,
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