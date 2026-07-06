<?php

namespace Database\Factories;

use App\Models\Agency;
use App\Models\TrackRecord;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<TrackRecord>
 */
class TrackRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'agency_id' => Agency::factory(),
            'title' => fake()->randomElement([
                'Enterprise software renewal',
                'Retail rollout opportunity',
                'Warehouse expansion deal',
                'Regional distributor onboarding',
                'Customer retention package',
                'Quarterly supply contract',
            ]),
            'estimated_revenue' => fake()->boolean(85) ? fake()->randomFloat(2, 5000, 250000) : null,
            'status' => fake()->randomElement(TrackRecord::statuses()),
            'note' => fake()->boolean(70) ? fake()->sentence() : null,
        ];
    }
}
