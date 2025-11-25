<?php

namespace App\Http\Controllers\Clinics;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        // Find the notification
        try {
            $notification = $user->notifications()->findOrFail($request->id);

            // Mark it as read
            $notification->markAsRead();

            $notifications = $user->unreadNotifications;

            return redirect()->back(301);
        } catch (Exception $e) {

            throw $e;
        }
    }
}
