<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EmailDelivery
 *
 * @property string $id
 * @property string $patient_result_id
 * @property string $patient_email
 * @property string $sent_by
 * @property string $subject
 * @property string $body
 * @property string $status
 * @property Carbon $sent_at
 * @property int $delivery_attempts
 * @property string|null $error_message
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @package App\Models
 * @property string|null $scheduled_at
 * @property-read \App\Models\Patient|null $patient
 * @property-read \App\Models\PatientResult|null $result
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereDeliveryAttempts($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereErrorMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery wherePatientEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery wherePatientResultId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereScheduledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereSentAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereSentBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class EmailDelivery extends Model
{
	use HasUuids;
	protected $table = 'email_deliveries';
	public $incrementing = false;

	protected $casts = [
		'sent_at' => 'datetime',

		'delivery_attempts' => 'int'
	];

	protected $fillable = [
		'patient_result_id',
		'patient_email',
		'sent_by',
		'subject',
		'body',
		'status',
		'sent_at',
		'delivery_attempts',
		'error_message',
		'scheduled_at'
	];

	public function patient()
	{
		return $this->hasOne(Patient::class, 'email', 'patient_email');
	}

	public function result()
	{
		return $this->hasOne(PatientResult::class, 'id', 'patient_result_id');
	}
}