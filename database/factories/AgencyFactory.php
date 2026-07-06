<?php

namespace Database\Factories;

use App\Models\Agency;
use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Agency>
 */
class AgencyFactory extends Factory
{
    private const REGIONS = [
        'North',
        'Central',
        'South',
        'East',
        'West',
        'Mekong Delta',
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sale_id' => Sale::factory(),
            'name' => fake()->company().' Agency',
            'address' => fake()->boolean(90) ? fake()->address() : null,
            'region' => fake()->boolean(90) ? fake()->randomElement(self::REGIONS) : null,
        ];
    }
}
