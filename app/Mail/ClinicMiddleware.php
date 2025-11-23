<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ClinicMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user('admin')) {
            if ($request->user()->role === 'admin') {
                return redirect(route('admin.dashboard'));
            } else if ($request->user()->role === 'super_admin') {
                return redirect(route('admin.dashboard'));
            }
        }
        return $next($request);
    }
}
