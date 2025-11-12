<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user('clinic')) {
            return redirect(route('user.dashboard'));
        }

        if ($request->user()->role === null) {
            return redirect(route('user.dashboard'));
        }


        return $next($request);
    }
}
