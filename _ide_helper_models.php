<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * Class Admin
 *
 * @property uuid $id
 * @property string $name
 * @property string $email
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string $phone_no
 * @property string $role
 * @property string $status
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin wherePhoneNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Admin whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 */
	class Admin extends \Eloquent {}
}

namespace App\Models{
/**
 * Class Cache
 *
 * @property string $key
 * @property string $value
 * @property int $expiration
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cache newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cache newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cache query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cache whereExpiration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cache whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cache whereValue($value)
 * @mixin \Eloquent
 */
	class Cache extends \Eloquent {}
}

namespace App\Models{
/**
 * Class CacheLock
 *
 * @property string $key
 * @property string $owner
 * @property int $expiration
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CacheLock newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CacheLock newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CacheLock query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CacheLock whereExpiration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CacheLock whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CacheLock whereOwner($value)
 * @mixin \Eloquent
 */
	class CacheLock extends \Eloquent {}
}

namespace App\Models{
/**
 * Class Clinic
 *
 * @property string $id
 * @property string $clinic_name
 * @property string $email
 * @property string $avatar
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string $phone_no
 * @property string $address
 * @property string $state
 * @property string $country
 * @property string $status
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Collection|PatientResult[] $patient_results
 * @package App\Models
 * @property string $name
 * @property string|null $staff_no
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read int|null $patient_results_count
 * @method static \Database\Factories\ClinicFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic wherePhoneNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereStaffNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Clinic whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\EmailDelivery> $emailDeliveries
 * @property-read int|null $email_deliveries_count
 */
	class Clinic extends \Eloquent {}
}

namespace App\Models{
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
 * @property string|null $deleted_at
 * @property-read \App\Models\Clinic $sentByClinic
 * @method static \Illuminate\Database\Eloquent\Builder<static>|EmailDelivery whereDeletedAt($value)
 */
	class EmailDelivery extends \Eloquent {}
}

namespace App\Models{
/**
 * Class FailedJob
 *
 * @property int $id
 * @property string $uuid
 * @property string $connection
 * @property string $queue
 * @property string $payload
 * @property string $exception
 * @property Carbon $failed_at
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FailedJob newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FailedJob newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FailedJob query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FailedJob whereConnection($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FailedJob whereException($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FailedJob whereFailedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FailedJob whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FailedJob wherePayload($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FailedJob whereQueue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|FailedJob whereUuid($value)
 * @mixin \Eloquent
 */
	class FailedJob extends \Eloquent {}
}

namespace App\Models{
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
 * @property PatientResult $patient_result
 * @package App\Models
 * @property string $file_name
 * @property string $file_url
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File whereFileSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File whereFileType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File whereFileUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File whereOriginalFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File whereResult($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|File whereUpdatedAt($value)
 * @mixin \Eloquent
 */
	class File extends \Eloquent {}
}

namespace App\Models{
/**
 * Class Job
 *
 * @property int $id
 * @property string $queue
 * @property string $payload
 * @property int $attempts
 * @property int|null $reserved_at
 * @property int $available_at
 * @property int $created_at
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereAttempts($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereAvailableAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job wherePayload($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereQueue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Job whereReservedAt($value)
 * @mixin \Eloquent
 */
	class Job extends \Eloquent {}
}

namespace App\Models{
/**
 * Class JobBatch
 *
 * @property string $id
 * @property string $name
 * @property int $total_jobs
 * @property int $pending_jobs
 * @property int $failed_jobs
 * @property string $failed_job_ids
 * @property string|null $options
 * @property int|null $cancelled_at
 * @property int $created_at
 * @property int|null $finished_at
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch whereCancelledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch whereFailedJobIds($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch whereFailedJobs($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch whereFinishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch whereOptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch wherePendingJobs($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|JobBatch whereTotalJobs($value)
 * @mixin \Eloquent
 */
	class JobBatch extends \Eloquent {}
}

namespace App\Models{
/**
 * Class Notification
 *
 * @property string $id
 * @property string $type
 * @property string $notifiable_type
 * @property string $notifiable_id
 * @property string $data
 * @property Carbon|null $read_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereNotifiableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereNotifiableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereReadAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Notification whereUpdatedAt($value)
 */
	class Notification extends \Eloquent {}
}

namespace App\Models{
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
 * @property-read int|null $latest_result_count
 */
	class Patient extends \Eloquent {}
}

namespace App\Models{
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
 * @property Clinic $clinic
 * @property Patient $patient
 * @property Collection|File[] $files
 * @package App\Models
 * @property-read int|null $files_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult whereClinicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult whereEncrypted($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult wherePatientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult whereResultType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult whereTestDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult whereTestName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|PatientResult whereUploadedAt($value)
 * @mixin \Eloquent
 * @property-read \App\Models\EmailDelivery|null $emailDelivery
 */
	class PatientResult extends \Eloquent {}
}

namespace App\Models{
/**
 * Class Session
 *
 * @property string $id
 * @property string|null $user_id
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property string $payload
 * @property int $last_activity
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Session newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Session newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Session query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Session whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Session whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Session whereLastActivity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Session wherePayload($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Session whereUserAgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Session whereUserId($value)
 * @mixin \Eloquent
 */
	class Session extends \Eloquent {}
}

namespace App\Models{
/**
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @mixin \Eloquent
 */
	class User extends \Eloquent {}
}

namespace App\Models{
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
 * @property PatientResult $patient_result
 * @property Clinic $clinic
 * @package App\Models
 * @property string $patient_id
 * @property-read \App\Models\Patient $patient
 * @property-read \App\Models\PatientResult|null $result
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereDeliveryAttempts($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereErrorMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage wherePatientEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage wherePatientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage wherePatientResultId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereScheduledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereSentAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereSentBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|WhatsappMessage withoutTrashed()
 */
	class WhatsappMessage extends \Eloquent {}
}

