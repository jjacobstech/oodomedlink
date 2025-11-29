<?php

namespace App\Mail;

use App\Models\Clinic;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Mail\Mailables\Address;
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

    public $clinic;




    /**
     * Create a new message instance.
     */
    public function __construct(object $receipient, string $subject, array $attachments,  string $notes, $clinic)
    {
        $this->receipient = $receipient;
        $this->subject($subject);
        $this->mailAttachments = $attachments;
        $this->notes = $notes;
        $this->clinic = $clinic;

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(
                config('mail.from.address'),
                $this->clinic->name . ' from OodoMedlink'
            ),
            tags: ['Oodomedlink Support'],
            metadata: ['oodomedlink', 'digital medical lab system', 'oodomedlink.com', config('mail.from.address')],
            subject: $this->subject,
            to: $this->receipient->email,
            replyTo: [new Address(
                $this->clinic->email,
                $this->clinic->name
            )]
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
                'clinic' =>  $this->clinic,
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