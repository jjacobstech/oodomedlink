<?php

namespace App\Http\Controllers\Clinics;

use Inertia\Inertia;
use App\Jobs\ResultJob;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\EmailDelivery;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Notifications\EmailNotification;

class EmailController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user()->id;

        $validated = $request->validate([
            'filter' => 'nullable|string|in:all,pending,sent,failed,scheduled',
            'search' => 'nullable|string|min:1|max:255'
        ]);

        $filter = $validated['filter'] ?? 'all';
        $search = $validated['search'] ?? '';

        $emails = EmailDelivery::where('sent_by', $user)
            ->with(['patient:id,full_name,email', 'result.files'])
            ->when($filter !== 'all', function ($query) use ($filter) {
                $query->where('status', $filter);
            })
            ->when(!empty($search), function ($query) use ($search) {
                $query->whereHas('patient', function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%");
                });
            })
            ->latest('sent_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('User/Emails', [
            'emails' => $emails,
                'search' => $search,
            'filter' => $filter,
        ]);
    }

    public function retry(Request $request)
    {

        $user = Auth::user();
        $validated = $request->validate([
            'id' => 'required|exists:email_deliveries,id'
        ]);

        $email = EmailDelivery::find($validated['id']);

        // Verify the email belongs to the current user
        if (Str::lower($email->sent_by) !== Str::lower(Auth::user()->name)) {
            abort(403, 'Unauthorized action.');
        }

        // Only retry failed emails
        if ($email->status !== 'failed' && $email->status !== 'scheduled' && $email->status !== 'pending') {
            return redirect()->route('user.emails')->with('error', 'Only failed emails can be retried.');
        }

        try {
            // Load relationships
            $email->load(['patient', 'result.files']);

            // Prepare attachments array
            $attachments = [];
            if ($email->result && $email->result->files) {
                $attachments = $email->result->files->map(function ($file) {
                    return $file->file_path;
                })->toArray();
            }


            // Dispatch the job
            ResultJob::dispatchSync(
                $email->subject,
                $email->patient,
                $attachments,
                $email->body ?? '',
                $email->id,
                Auth::user()
            );

            $message = 'Result uploaded and sent successfully';

            $user->notify(new EmailNotification($message));

            return redirect()->route('user.emails')->with('success', 'Email retry initiated successfully.');
        } catch (\Exception $e) {
            Log::error('Email retry failed: ' . $e->getMessage(), [
                'email_id' => $email->id,
                'patient_email' => $email->patient_email,
            ]);

            return redirect()->route('user.emails')->with('error', 'Failed to retry email. Please try again.');
        }
    }

    public function show(EmailDelivery $email)
    {
        // Verify the email belongs to the current user
        if ($email->sent_by !== Auth::user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $email->load(['patient', 'result.files']);

        return Inertia::render('User/EmailDetails', [
            'email' => $email
        ]);
    }
}