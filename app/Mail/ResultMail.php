<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResultMail extends Mailable
{
    use Queueable, SerializesModels;

    public object $receipient;
    public array $mailAttachments;

    public string $notes;




    /**
     * Create a new message instance.
     */
    public function __construct(object $receipient, string $subject, array $attachments,  string $notes)
    {
        $this->receipient = $receipient;
        $this->subject($subject);
        $this->mailAttachments = $attachments;
        $this->notes = $notes;

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: config('mail.from.address'),
            metadata: ['oodomedlink', 'digital medical lab system'],
            subject: $this->subject,
            to: $this->receipient->email
        );

    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.result-mail',
            with: [
                'receipient' => $this->receipient,
                'clinic' => Auth::user(),
                'year' => Carbon::now()->year,
                'notes' => $this->notes
            ],


        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {

        $attachments = [];

        if (!empty($this->mailAttachments)) {
            foreach ($this->mailAttachments as $key => $file) {
                $attachments[] = Attachment::fromPath($file);
            }
        }

        return $attachments;
    }
}