<?php

namespace App\Http\Controllers\Clinics;

use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Jobs\ResultJob;
use Illuminate\Http\Request;
use App\Models\EmailDelivery;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class EmailController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user()->name;

        $validated = $request->validate([
            'filter' => 'nullable|string|in:all,pending,sent,failed',
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
            'filters' => [
                'search' => $search,
                'filter' => $filter,
            ]
        ]);
    }

    public function retry(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:email_deliveries,id'
        ]);
        $email = EmailDelivery::find($validated['id']);
        // Verify the email belongs to the current user
        if ($email->sent_by !== Auth::user()->name) {
            abort(403, 'Unauthorized action.');
        }

        // Only retry failed emails
        if ($email->status !== 'failed' && $email->status !== 'scheduled' && $email->status !== 'pending') {
            dd('retry', $email->status);
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
            ResultJob::dispatch(
                $email->subject,
                $email->patient,
                $attachments,
                $email->body ?? '',
                $email->id,
                Auth::user()
            );

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
        if ($email->sent_by !== Auth::user()->name) {
            abort(403, 'Unauthorized action.');
        }

        $email->load(['patient', 'result.files']);

        return Inertia::render('User/EmailDetails', [
            'email' => $email
        ]);
    }
}