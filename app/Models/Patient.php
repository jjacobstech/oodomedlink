<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Patient
 *
 * @property string $id
 * @property string $clinic_id
 * @property string $full_name
 * @property string $email
 * @property string|null $phone_no
 * @property Carbon|null $date_of_birth
 * @property string|null $gender
 * @property string|null $address
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Collection|PatientResult[] $patient_results
 *
 * @package App\Models
 */
class Patient extends Model
{
	use HasUuids;

	protected $table = 'patients';
	public $incrementing = false;

	protected $casts = [
		'date_of_birth' => 'datetime'
	];

	protected $fillable = [
		'clinic_id',
		'full_name',
		'email',
		'phone_no',
		'date_of_birth',
		'gender',
		'address'
	];

	public function results()
	{
		return $this->hasMany(PatientResult::class);
	}

	public function latestResult()
	{
		return $this->hasMany(PatientResult::class)->latest('uploaded_at')->limit(1);
	}


}