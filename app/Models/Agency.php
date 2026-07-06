<?php

namespace App\Models;

use Database\Factories\AgencyFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $sale_id
 * @property string $name
 * @property string|null $address
 * @property string|null $region
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable(['sale_id', 'name', 'address', 'region'])]
class Agency extends Model
{
    /** @use HasFactory<AgencyFactory> */
    use HasFactory;

    /**
     * @return BelongsTo<Sale, $this>
     */
    public function sale(): BelongsTo
    {
        return $this->belongsTo(Sale::class);
    }

    /**
     * @return HasMany<TrackRecord, $this>
     */
    public function trackRecords(): HasMany
    {
        return $this->hasMany(TrackRecord::class);
    }
}
