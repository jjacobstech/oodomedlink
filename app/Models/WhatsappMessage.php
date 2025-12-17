<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

/**
 * Class WhatsappMessage
 *
 * @property string $id
 * @property string $patient_result_id
 * @property string $patient_email
 * @property string $sent_by
 * @property string $subject
 * @property string|null $body
 * @property string $status
 * @property Carbon|null $sent_at
 * @property Carbon|null $scheduled_at
 * @property int $delivery_attempts
 * @property string|null $error_message
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @property PatientResult $patient_result
 * @property Clinic $clinic
 *
 * @package App\Models
 */
class WhatsappMessage extends Model
{
	use SoftDeletes, HasUuids;
	protected $table = 'whatsapp_messages';
	public $incrementing = false;

	protected $casts = [
		'sent_at' => 'datetime',
		'scheduled_at' => 'datetime',
		'delivery_attempts' => 'int'
	];

	protected $fillable = [
		'patient_result_id',
		'patient_email',
		'patient_id',
		'sent_by',
		'subject',
		'body',
		'status',
		'sent_at',
		'scheduled_at',
		'delivery_attempts',
		'error_message'
	];

	public function result()
	{
		return $this->belongsTo(PatientResult::class);
	}

	public function clinic()
	{
		return $this->belongsTo(Clinic::class, 'sent_by');
	}


	public function patient()
	{
		return $this->belongsTo(Patient::class, 'patient_id');
	}
}
