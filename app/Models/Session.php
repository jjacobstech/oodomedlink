<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Session
 * 
 * @property uuid $id
 * @property int|null $clinic_id
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property string $payload
 * @property int $last_activity
 *
 * @package App\Models
 */
class Session extends Model
{
	protected $table = 'sessions';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'id' => 'uuid',
		'clinic_id' => 'int',
		'last_activity' => 'int'
	];

	protected $fillable = [
		'clinic_id',
		'ip_address',
		'user_agent',
		'payload',
		'last_activity'
	];
}
