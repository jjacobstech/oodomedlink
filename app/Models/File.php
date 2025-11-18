<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class File
 *
 * @property string $id
 * @property string $result
 * @property string $file_path
 * @property string $file_type
 * @property int $file_size
 * @property string $original_file_name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property PatientResult $patient_result
 *
 * @package App\Models
 */
class File extends Model
{
	use HasUuids;
	protected $table = 'files';
	public $incrementing = false;

	protected $casts = [
		'file_size' => 'int'
	];

	protected $fillable = [
		'result',
		'file_path',
		'file_type',
		'file_name',
		'file_url',
		'file_size',
		'original_file_name'
	];

	public function patient_result()
	{
		return $this->belongsTo(PatientResult::class, 'result');
	}
}
