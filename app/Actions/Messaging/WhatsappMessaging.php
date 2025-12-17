<?php

namespace App\Actions\Messaging;

use App\Classes\Data;
use Twilio\Rest\Client;
use App\Interfaces\Messaging;
use Illuminate\Support\Facades\Log;


class WhatsappMessaging implements Messaging
{

    protected Client $client;


    protected string $phone_number;
    /**
     * Create a new class instance.
     */
    public function __construct()
    {

        $sid = config('services.twilio.sid');
        $auth_token = config('services.twilio.auth_token');
        $this->phone_number = config('services.twilio.phone_number');
        $this->client = new  Client($sid, $auth_token);
    }

    public function sendMessage(string $to, ?string $body, ?Data $data)
    {

        Log::debug('Data $data:', [$data]);


        try {
            $content =  [
                'patient' => $data->patient ?? '',
                'clinic' => $data->clinic  ?? '',
                'clinicEmail' => $data->clinicEmail  ?? '',
                'clinicNumber' => $data->clinicNumber  ?? '',
                'year' => $data->year  ?? '',
            ];

            $params = array_merge(
                [
                    'from' =>  "whatsapp:$this->phone_number",
                    'mediaUrl' => 'https://oodomedlink.com/uploads/jpg/oodo-clinic_eY6ivmRPxFEFk814gIEJOwVCdYKBLg.jpg',
                    "contentSid" => "HXb5b62575e6e4ff6129ad7c8efe1f983e",
                    "contentVariables" => json_encode($content),
                ],
                $body ? ['body' => $body] : []
            );

            Log::info('whatsapp messaging log', ["Sending Whatsapp message to {$to}", $data->results]);

            return   $this->client->messages->create("whatsapp:$to", $params);
        } catch (\Exception $e) {
            Log::error('whatsapp messaging error', ["Error sending Whatsapp message to {$to}: {$e->getMessage()} ", 'data' => $data]);
            return $e;
        }
    }
}
