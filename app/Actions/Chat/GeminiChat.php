<?php

namespace App\Actions\Chat;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class GeminiChat
{

    protected $client;
    protected string $apiKey;
    protected string $url;

    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        $this->apiKey = config('services.gemini.api_key');
        $this->url = config('services.gemini.api_url');
        $this->client = new Client([
            'timeout' => 30,
        ]);
    }

    public function init(string $prompt)
    {
        try {
            $response =  $this->client->post($this->url, [
                'headers' => [
                    'x-goog-api-key' => $this->apiKey,
                    'Accept'        => 'application/json',
                    'Content-Type'   => 'application/json',
                ],
                'json' => [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt]
                            ]
                        ]
                    ]
                ]
            ]);
            $data = json_decode($response->getBody()->getContents(), true);
            return response()->json(
                ['data' => $data],
                200
            );
        } catch (RequestException $e) {
            return response()->json(
                ['data' => $e->getMessage()],
                500
            );
        }
    }
}
