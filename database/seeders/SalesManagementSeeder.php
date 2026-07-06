<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\Sale;
use App\Models\TrackRecord;
use Illuminate\Database\Seeder;

class SalesManagementSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $sales = Sale::factory()->active()->count(8)->create();
        $inactiveSales = Sale::factory()->inactive()->count(3)->create();

        $sales->each(function (Sale $sale): void {
            $agencies = Agency::factory()
                ->count(fake()->numberBetween(1, 4))
                ->for($sale)
                ->create();

            $agencies->each(function (Agency $agency): void {
                TrackRecord::factory()
                    ->count(fake()->numberBetween(2, 6))
                    ->for($agency)
                    ->create();
            });
        });

        $inactiveSales->each(function (Sale $sale): void {
            $agencies = Agency::factory()
                ->count(fake()->numberBetween(1, 2))
                ->for($sale)
                ->create();

            $agencies->each(function (Agency $agency): void {
                TrackRecord::factory()
                    ->count(fake()->numberBetween(1, 3))
                    ->for($agency)
                    ->create();
            });
        });

        $firstAgency = Agency::query()->first();

        if ($firstAgency instanceof Agency) {
            foreach (TrackRecord::statuses() as $status) {
                TrackRecord::factory()
                    ->for($firstAgency)
                    ->create(['status' => $status]);
            }
        }
    }
}
