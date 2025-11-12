<?php

namespace App\Mail;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Contracts\Queue\ShouldQueue;

class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;

    protected readonly string $otp;
    private readonly string $email;

    private readonly string $time;

    private readonly string $support;

    /**
     * Create a new message instance.
     */
    public function __construct(string $otp, string $email, string $time, string $support)
    {
        $this->otp = $otp;
        $this->email = $email;
        $this->time = $time;
        $this->support = $support;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Email Verification',
            from: $this->support,
            to: [$this->email]
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.email-verification',
            with: ['otp' => $this->otp, 'email' =>  $this->support, 'time' =>  $this->time, 'recipient' => $this->email, 'year' => Carbon::now()->year]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
