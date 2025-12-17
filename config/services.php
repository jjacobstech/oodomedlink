<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'twilio' => [
        'sid' => env('TWILIO_SID'),
        'auth_token' => env('TWILIO_AUTH_TOKEN'),
        'phone_number' => env('TWILIO_PHONE_NUMBER'),
        'content_Sid'
    ],

    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect_uri' => env('GOOGLE_REDIRECT_URI'),
        'credentials' => env('GOOGLE_CLIENT_CREDENTIALS'),

        'project' => [
            'id' => env('GOOGLE_PROJECT_ID'),
            'processor' => [
                'id' => env('GOOGLE_PROCESSOR_ID'),
                'name' => env('GOOGLE_PROCESSOR_NAME'),
                'location' => env('GOOGLE_PROCESSOR_LOCATION'),
            ]
        ]
    ],

    'claude' => [
        'api_key' => env('CLAUDE_API_KEY'),
    ],
    'gemini' => [
        'api_key' => env('GEMINI_API_KEY'),
        'api_url' => env('GEMINI_API_URL')
    ]

];