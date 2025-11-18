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
 *
 * @package App\Models
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
		'error_message'
	];
}