<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
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
 * @property Collection|PatientResult[] $patient_results
 * @package App\Models
 * @property string $name
 * @property string|null $staff_no
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read int|null $patient_results_count
 * @method static \Database\Factories\ClinicFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic wherePhoneNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereStaffNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereUpdatedAt($value)
 * @mixin \Eloquent
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
		'staff_no',
		'email_verified_at',
		'password',
		'phone_no',
		'address',
		'state',
		'country',
		'status',
		'remember_token'
	];

	public function patient_results(): HasMany
	{
		return $this->hasMany(PatientResult::class);
	}

	public function emailDeliveries(): HasMany
	{
		return $this->hasMany(EmailDelivery::class, 'sent_by');
	}

}