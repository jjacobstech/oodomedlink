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
        exec('cd .. && composer install 2>&1', $output, $return);
        foreach ($output as $line) {
            $this->line($this->stripAnsiCodes($line));
        }

        $this->info('Installing NPM dependencies...');
        exec('cd .. && npm install 2>&1', $output, $return);
        foreach ($output as $line) {
            $this->line($this->stripAnsiCodes($line));
        }

        return 0;
    }
}