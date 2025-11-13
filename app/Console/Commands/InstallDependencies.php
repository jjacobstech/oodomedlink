<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class InstallDependencies extends Command
{
    protected $signature = 'app:install-dependencies';


    private function stripAnsiCodes($string)
    {
        return preg_replace('/\x1b\[[0-9;]*m/', '', $string);
    }

    public function handle()
    {

        if (!app()->environment('local')) {
            $this->error('This command can only run in local environment!');
            return 1;
        }

        $this->info('Installing Composer dependencies...');

        $this->line($this->stripAnsiCodes(shell_exec('cd .. && composer install 2>&1')));

        $this->info('Installing NPM dependencies...');

        $this->line(json_encode($this->stripAnsiCodes(shell_exec('cd .. && npm install 2>&1'))));

        return 0;
    }
}