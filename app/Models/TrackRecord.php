<?php

namespace App\Models;

use Database\Factories\TrackRecordFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $agency_id
 * @property string $title
 * @property float|null $estimated_revenue
 * @property string $status
 * @property string|null $note
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['agency_id', 'title', 'estimated_revenue', 'status', 'note'])]
class TrackRecord extends Model
{
    /** @use HasFactory<TrackRecordFactory> */
    use HasFactory;

    public const STATUS_NEW = 'new';
    public const STATUS_CONTACTED = 'contacted';
    public const STATUS_POTENTIAL = 'potential';
    public const STATUS_CLOSED = 'closed';
    public const STATUS_LOST = 'lost';

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'estimated_revenue' => 'decimal:2',
        ];
    }

    /**
     * @return list<string>
     */
    public static function statuses(): array
    {
        return [
            self::STATUS_NEW,
            self::STATUS_CONTACTED,
            self::STATUS_POTENTIAL,
            self::STATUS_CLOSED,
            self::STATUS_LOST,
        ];
    }

    /**
     * @return BelongsTo<Agency, $this>
     */
    public function agency(): BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }
}
