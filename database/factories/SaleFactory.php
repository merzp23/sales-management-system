<?php

namespace Database\Factories;

use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->boolean(80) ? fake()->unique()->safeEmail() : null,
            'phone_number' => fake()->boolean(85) ? fake()->phoneNumber() : null,
            'status' => fake()->randomElement(Sale::statuses()),
        ];
    }

    public function active(): static
    {
        return $this->state(fn () => ['status' => Sale::STATUS_ACTIVE]);
    }

    public function inactive(): static
    {
        return $this->state(fn () => ['status' => Sale::STATUS_INACTIVE]);
    }
}
