<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use App\Models\Clinic;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
 * @property Collection|PatientResult[] $patient_results
 * @package App\Models
 * @property-read Clinic|null $clinic
 * @property-read int|null $age
 * @property-read \App\Models\PatientResult|null $latestResult
 * @property-read Collection<int, \App\Models\PatientResult> $results
 * @property-read int|null $results_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient byGender($gender)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient forClinic($clinicId)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient search($search)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient whereClinicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient whereDateOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient wherePhoneNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Patient whereUpdatedAt($value)
 * @mixin \Eloquent
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


	public function clinic(): BelongsTo
	{
		return $this->belongsTo(Clinic::class, 'clinic_id');
	}

	/**
	 * Get all results for the patient.
	 */
	public function results(): HasMany
	{
		return $this->hasMany(PatientResult::class);
	}

	/**
	 * Get the latest result for the patient.
	 */
	public function latestResult(): HasMany
	{
		return $this->hasMany(PatientResult::class, 'patient_id')->latest('uploaded_at');
	}

	/**
	 * Get the patient's age.
	 */
	public function getAgeAttribute(): ?int
	{
		if (!$this->date_of_birth) {
			return null;
		}

		return $this->date_of_birth->age;
	}

	/**
	 * Scope a query to only include patients from a specific clinic.
	 */
	public function scopeForClinic($query, $clinicId): mixed
	{
		return $query->where('clinic_id', $clinicId);
	}

	/**
	 * Scope a query to search patients.
	 */
	public function scopeSearch($query, $search): mixed
	{
		if (empty($search)) {
			return $query;
		}

		return $query->where(function ($q) use ($search) {
			$q->where('full_name', 'like', "%{$search}%")
				->orWhere('email', 'like', "%{$search}%")
				->orWhere('phone_no', 'like', "%{$search}%");
		});
	}

	/**
	 * Scope a query to filter by gender.
	 */
	public function scopeByGender($query, $gender): mixed
	{
		if (empty($gender)) {
			return $query;
		}

		return $query->where('gender', $gender);
	}
}