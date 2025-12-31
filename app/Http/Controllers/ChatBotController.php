<?php

namespace App\Http\Controllers;

use App\Actions\Chat\GeminiChat;
use Illuminate\Http\Request;

class ChatBotController extends Controller
{

      public function index(Request $request)
      {

            $validated = $request->validate([
                  'prompt' => 'required|string|max:255',
            ]);


            $geminiChat = new GeminiChat();
            $response =  $geminiChat->init($validated['prompt'] ?? '');
            file_put_contents(public_path('AIlogs.txt'), $response);
            return str_replace('*', '', $response->getData()->data->candidates[0]->content->parts[0]->text ?? false);
      }
}
