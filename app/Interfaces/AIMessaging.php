<?php

namespace App\Interfaces;

interface AIMessaging
{
    public function sendChat(string $prompt, mixed $document);
}
