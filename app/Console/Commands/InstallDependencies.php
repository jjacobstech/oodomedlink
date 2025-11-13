<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class InstallDependencies extends Command
{
    protected $signature = 'app:install-dependencies';

    public function handle()
    {

        if (!app()->environment('local')) {
            $this->error('This command can only run in local environment!');
            return 1;
        }

        $this->info('Installing Composer dependencies...');
        exec('cd .. && composer install 2>&1', $output, $return);
        $this->line(implode("\n", $output));

        $this->info('Installing NPM dependencies...');
        exec('cd .. && npm install 2>&1', $output, $return);
        $this->line(implode("\n", $output));

        return 0;
    }
}
