<?php

namespace App\Classes;

use Traversable;
use Carbon\Carbon;

class Data
{
    public string $patient;
    public string $clinic;
    public string $clinicEmail;
    public string $clinicNumber;
    public array $results;

    public Carbon|string $year;

    public function __construct(string $patient, string $clinic, string $clinicEmail, string $clinicNumber, array $results)
    {

        $this->patient = $patient;
        $this->clinic = $clinic;
        $this->clinicEmail = $clinicEmail;
        $this->clinicNumber = $clinicNumber;
        $this->results = $results;
        $this->year = Carbon::now()->year;
    }
}
