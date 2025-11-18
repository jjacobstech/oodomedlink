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
 * Class PatientResult
 *
 * @property string $id
 * @property string $clinic_id
 * @property string $patient_id
 * @property string $result_type
 * @property string $test_name
 * @property Carbon $test_date
 * @property array|null $data
 * @property bool $encrypted
 * @property string|null $notes
 * @property string $status
 * @property Carbon $uploaded_at
 * @property Carbon $updated_at
 *
 * @property Clinic $clinic
 * @property Patient $patient
 * @property Collection|File[] $files
 *
 * @package App\Models
 */
class PatientResult extends Model
{

	use HasUuids;
	protected $table = 'patient_results';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'test_date' => 'datetime',
		'data' => 'json',
		'encrypted' => 'bool',
		'uploaded_at' => 'datetime'
	];

	protected $fillable = [
		'clinic_id',
		'patient_id',
		'result_type',
		'test_name',
		'test_date',
		'data',
		'encrypted',
		'notes',
		'status',
		'uploaded_at'
	];

	public function clinic()
	{
		return $this->belongsTo(Clinic::class);
	}

	public function patient()
	{
		return $this->belongsTo(Patient::class);
	}

	public function files()
	{
		return $this->hasMany(File::class, 'result');
	}
}