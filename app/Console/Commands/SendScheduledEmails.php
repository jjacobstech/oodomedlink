<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\File;
use App\Models\Clinic;
use App\Mail\ResultMail;
use App\Models\EmailDelivery;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Notifications\EmailNotification;

class SendScheduledEmails extends Command
{
    protected $signature = 'emails:send-scheduled {--limit=}';
    protected $description = 'Send scheduled emails';

    public function handle()
    {


        $limit = $this->option('limit') ?? config('mail.email_processes_limit', 50);
        $attempts = config('mail.max_delivery_attempts');

        // Get emails that are scheduled to be sent now or earlier
        $scheduledEmails = EmailDelivery::where('status', 'scheduled')
            ->with([
                'patient:id,full_name,email',
                'result:id'
            ])
            ->where('scheduled_at', '<=', Carbon::now(config('app.timezone')))
            ->whereNull('sent_at')
            // Skip emails that have failed too many times
            ->where('delivery_attempts', '<', $attempts)
            ->limit($limit)
            ->get();

        if ($scheduledEmails->isEmpty()) {
            $this->info('No scheduled emails to send');
            return 0;
        }

        $this->info("Processing {$scheduledEmails->count()} scheduled emails...");

        $sent = 0;
        $failed = 0;



        // Pre-load clinics to avoid N+1 queries
        $clinicId = $scheduledEmails->pluck('sent_by')->unique();
        $clinics = Clinic::whereIn('id', $clinicId)->get()->keyBy('id');

        foreach ($scheduledEmails as $email) {
            try {


                // Get clinic from pre-loaded collection
                $clinic = $clinics->get($email->sent_by);


                if (!$clinic) {
                    throw new \Exception("Clinic '{$email->sent_by}' not found");
                }

                // Validate patient email
                if (empty($email->patient_email)) {
                    throw new \Exception("Recipient email is empty");
                }

                // Get file paths - more efficient query
                $file_paths = File::where('result', $email->patient_result_id)
                    ->pluck('file_path')
                    ->toArray();

                // Send the email
                Mail::to($email->patient_email)->send(
                    new ResultMail(
                        $email->patient,
                        $email->subject,
                        $file_paths,
                        $email->body,
                        $clinic,
                    )
                );

                // Mark as sent - use direct update for efficiency
                $email->update([
                    'status' => 'sent',
                    'sent_at' => Carbon::now(),
                    'error_message' => null, // Clear any previous errors
                    'delivery_attempts' => $email->delivery_attempts + 1,
                ]);


                $message = "Email scheduled for {$email->scheduled_at} to {$email->patient->full_name} has been sent.";

                $clinic->notify(new EmailNotification($message));

                $sent++;
                $this->info("✓ Sent email to: {$email->patient_email} for {$email->patient->full_name}");
            } catch (\Exception $e) {
                $failed++;

                // Log the error with context
                Log::error('Failed to send scheduled email', [
                    'email_id' => $email->id,
                    'recipient' => $email->patient_email,
                    'patient' => $email->patient->full_name ?? 'Unknown',
                    'error' => $e->getMessage(),
                    'attempt' => $email->delivery_attempts + 1,
                ]);

                $this->error("✗ Failed to send email ID {$email->id}: " . $e->getMessage());

                // Update error status
                $newAttempts = $email->delivery_attempts + 1;

                $email->update([
                    'error_message' => $e->getMessage(),
                    'delivery_attempts' => $newAttempts,
                    // Mark as failed after 3 attempts
                    'status' => $newAttempts >= $attempts ? 'failed' : 'scheduled',
                ]);

                // If reached max attempts, log it prominently
                if ($newAttempts >= $attempts) {
                    $this->warn("Email ID {$email->id} marked as FAILED after {$newAttempts} attempts");
                }
            }
        }

        // Summary
        $this->newLine();
        $this->info("========================================");
        $this->info("Email Processing Summary:");
        $this->info("Successfully sent: {$sent}");
        if ($failed > 0) {
            $this->warn("Failed: {$failed}");
        }
        $this->info("========================================");

        return 0;
    }
}