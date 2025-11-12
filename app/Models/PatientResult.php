<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PatientResult
 * 
 * @property uuid $id
 * @property uuid $clinic_id
 * @property uuid $patient_id
 * @property string $result_type
 * @property string $test_name
 * @property Carbon $test_date
 * @property string $file_path
 * @property string $file_type
 * @property int $file_size
 * @property string $original_file_name
 * @property bool $enctypred
 * @property string $notes
 * @property string $status
 * @property Carbon $uploaded_at
 * @property Carbon $updated_at
 * 
 * @property Clinic $clinic
 * @property Patient $patient
 *
 * @package App\Models
 */
class PatientResult extends Model
{
	protected $table = 'patient_result';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'uuid',
		'clinic_id' => 'uuid',
		'patient_id' => 'uuid',
		'test_date' => 'datetime',
		'file_size' => 'int',
		'enctypred' => 'bool',
		'uploaded_at' => 'datetime'
	];

	protected $fillable = [
		'clinic_id',
		'patient_id',
		'result_type',
		'test_name',
		'test_date',
		'file_path',
		'file_type',
		'file_size',
		'original_file_name',
		'enctypred',
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
}
