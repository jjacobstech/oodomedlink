<?php

namespace App\Http\Controllers\Clinics;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;

class NotificationController extends Controller
{
    /**
     * Mark a single notification as read
     */
    public function markAsRead(Request $request): JsonResponse|RedirectResponse
    {
        try {
            $validated = $request->validate([
                'notification_id' => 'required|string|uuid'
            ]);

            $user = Auth::user();
            $notification = $user->notifications()->findOrFail($validated['notification_id']);

            // Only mark as read if it's not already read
            if (!$notification->read_at) {
                $notification->markAsRead();
            }

            // Return JSON for AJAX requests, redirect for regular requests
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Notification marked as read',
                    'notification' => $notification
                ]);
            }

            return redirect()->back()->with('success', 'Notification marked as read');
        } catch (ValidationException $e) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid notification ID',
                    'errors' => $e->errors()
                ], 422);
            }

            return redirect()->back()->withErrors($e->errors());
        } catch (Exception $e) {
            \Log::error('Error marking notification as read', [
                'user_id' => Auth::id(),
                'notification_id' => $request->notification_id ?? null,
                'error' => $e->getMessage()
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to mark notification as read'
                ], 500);
            }

            return redirect()->back()->with('error', 'Failed to mark notification as read');
        }
    }

    /**
     * Mark all notifications as read
     */
    public function markAllAsRead(Request $request): JsonResponse|RedirectResponse
    {
        try {
            $user = Auth::user();
            $user->unreadNotifications->markAsRead();

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'All notifications marked as read'
                ]);
            }

            return redirect()->back()->with('success', 'All notifications marked as read');
        } catch (Exception $e) {
            \Log::error('Error marking all notifications as read', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to mark all notifications as read'
                ], 500);
            }

            return redirect()->back()->with('error', 'Failed to mark all notifications as read');
        }
    }

    /**
     * Get all notifications for the authenticated user
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();

            $perPage = $request->input('per_page', 15);
            $type = $request->input('type', 'all'); // all, read, unread

            $query = $user->notifications();

            // Filter by type
            if ($type === 'unread') {
                $query->whereNull('read_at');
            } elseif ($type === 'read') {
                $query->whereNotNull('read_at');
            }

            $notifications = $query->latest()->paginate($perPage);

            return response()->json([
                'success' => true,
                'notifications' => $notifications
            ]);
        } catch (Exception $e) {
            \Log::error('Error fetching notifications', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch notifications'
            ], 500);
        }
    }

    /**
     * Delete a notification
     */
    public function destroy(Request $request, string $id): JsonResponse|RedirectResponse
    {
        try {
            $user = Auth::user();
            $notification = $user->notifications()->findOrFail($id);
            $notification->delete();

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Notification deleted'
                ]);
            }

            return redirect()->back()->with('success', 'Notification deleted');
        } catch (Exception $e) {
            \Log::error('Error deleting notification', [
                'user_id' => Auth::id(),
                'notification_id' => $id,
                'error' => $e->getMessage()
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to delete notification'
                ], 500);
            }

            return redirect()->back()->with('error', 'Failed to delete notification');
        }
    }

    /**
     * Delete all read notifications
     */
    public function clearRead(Request $request): JsonResponse|RedirectResponse
    {
        try {
            $user = Auth::user();
            $user->notifications()->whereNotNull('read_at')->delete();

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Read notifications cleared'
                ]);
            }

            return redirect()->back()->with('success', 'Read notifications cleared');
        } catch (Exception $e) {
            \Log::error('Error clearing read notifications', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to clear notifications'
                ], 500);
            }

            return redirect()->back()->with('error', 'Failed to clear notifications');
        }
    }

    /**
     * Get notification count
     */
    public function getCount(): JsonResponse
    {
        try {
            $user = Auth::user();

            return response()->json([
                'success' => true,
                'total' => $user->notifications()->count(),
                'unread' => $user->unreadNotifications()->count()
            ]);
        } catch (Exception $e) {
            \Log::error('Error getting notification count', [
                'user_id' => Auth::id(),
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to get notification count'
            ], 500);
        }
    }
}