<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user('clinic'),
                'admin' => $request->user('admin'),
                'notifications' => $request->user()?->unreadNotifications ?? $request->user('admin')->unreadNotifications ?? collect(),
            ],
            'session_data' => session()->get('data'),
            'success' => session()->get('success'),
            'error' => session()->get('error'),
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
                'base_url' => config('app.url')
            ],
        ];
    }
}