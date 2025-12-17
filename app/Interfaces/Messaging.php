<?php

namespace App\Interfaces;

use App\Classes\Data;

interface Messaging
{
    public function sendMessage(string $to, ?string $body, Data $data);
}
