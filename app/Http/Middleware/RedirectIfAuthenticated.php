<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (Auth::guard('admin')->check()) {
            // If admin guard, redirect to admin dashboard
            return redirect()->route('admin.dashboard');
        }

        if (Auth::guard('clinic')->check()) {
            // If admin guard, redirect to admin dashboard
            return redirect()->route('user.dashboard');
        }

        if (Auth::guard('web')->check()) {
            // If admin guard, redirect to admin dashboard
            return redirect()->route('user.dashboard');
        }

        return $next($request);
    }
}
