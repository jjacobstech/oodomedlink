<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Patient
 * 
 * @property uuid $id
 * @property string $patient_id
 * @property string $full_name
 * @property string $email
 * @property string $phone_no
 * @property Carbon $date_of_birth
 * @property string $gender
 * @property string $address
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|PatientResult[] $patient_results
 *
 * @package App\Models
 */
class Patient extends Model
{
	protected $table = 'patients';
	public $incrementing = false;

	protected $casts = [
		'id' => 'uuid',
		'date_of_birth' => 'datetime'
	];

	protected $fillable = [
		'patient_id',
		'full_name',
		'email',
		'phone_no',
		'date_of_birth',
		'gender',
		'address'
	];

	public function patient_results()
	{
		return $this->hasMany(PatientResult::class);
	}
}
