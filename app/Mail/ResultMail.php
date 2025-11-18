<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResultMail extends Mailable
{
    use Queueable, SerializesModels;

    protected string $receipient;

    protected string $subject;

    protected array $attachments;

    protected object $data;

    /**
     * Create a new message instance.
     */
    public function __construct(string $receipient, string $subject, object $data, array $attachments)
    {
        $this->receipient = $receipient;
        $this->subject($subject);
        $this->attachments = $attachments;
        $this->data = $data;

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: config('mail.from.address'),
            metadata: ['oodomedlink', 'digital medical lab system']
        );

    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'view.result-mail',
            with: ['receipient' => $this->receipient]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [...$this->attachments];
    }
}