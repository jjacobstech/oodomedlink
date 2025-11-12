<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class Clinic
 *
 * @property string $id
 * @property string $clinic_name
 * @property string $email
 * @property string $avatar
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string $phone_no
 * @property string $address
 * @property string $state
 * @property string $country
 * @property string $status
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Collection|PatientResult[] $patient_results
 *
 * @package App\Models
 */
class Clinic extends Authenticatable
{
	use Notifiable, HasUuids, HasFactory;
	protected $table = 'clinics';
	public $incrementing = false;

	protected $casts = [
		'email_verified_at' => 'datetime'
	];

	protected $hidden = [
		'password',
		'remember_token'
	];

	protected $fillable = [
		'name',
		'email',
		'avatar',
		'email_verified_at',
		'password',
		'phone_no',
		'address',
		'state',
		'country',
		'status',
		'remember_token'
	];

	public function patient_results()
	{
		return $this->hasMany(PatientResult::class);
	}
}
