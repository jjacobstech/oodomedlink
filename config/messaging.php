<?php
return [
      'whatsapp' => [
            'message' => [
                  'message_processes_limit' => env('WHATSAPP_MESSAGE_PROCESSES_LIMIT', 50),
                  'max_delivery_attempts' => env('WHATSAPP_MAX_DELIVERY_ATTEMPTS', 5),
            ]
      ]
];
