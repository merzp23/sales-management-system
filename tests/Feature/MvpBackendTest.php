<?php

namespace Tests\Feature;

use App\Models\Agency;
use App\Models\Sale;
use App\Models\TrackRecord;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class MvpBackendTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_route_returns_expected_stats(): void
    {
        $sale = Sale::factory()->active()->create();
        $agency = Agency::factory()->for($sale)->create();
        TrackRecord::factory()->for($agency)->create([
            'status' => TrackRecord::STATUS_NEW,
        ]);

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Dashboard/Index')
                ->where('stats.activeSales', 1)
                ->where('stats.agencies', 1)
                ->where('stats.trackRecords', 1)
                ->where('stats.trackRecordsByStatus.new', 1));
    }

    public function test_sale_store_validates_and_persists(): void
    {
        $this->post(route('sales.store'), [
            'name' => 'Alice Doe',
            'email' => 'alice@example.com',
            'phone_number' => '0123456789',
            'status' => Sale::STATUS_ACTIVE,
        ])->assertRedirect(route('sales.index'));

        $this->assertDatabaseHas('sales', [
            'name' => 'Alice Doe',
            'email' => 'alice@example.com',
            'status' => Sale::STATUS_ACTIVE,
        ]);
    }

    public function test_agency_store_requires_existing_sale(): void
    {
        $this->from(route('agencies.create'))
            ->post(route('agencies.store'), [
                'sale_id' => 999999,
                'name' => 'North Hub',
                'address' => '123 Main Street',
                'region' => 'North',
            ])
            ->assertRedirect(route('agencies.create'))
            ->assertSessionHasErrors('sale_id');
    }

    public function test_track_record_create_exposes_agency_options(): void
    {
        $sale = Sale::factory()->create(['name' => 'Sale Owner']);
        $agency = Agency::factory()->for($sale)->create(['name' => 'Agency One']);

        $this->get(route('track-records.create'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('TrackRecords/Create')
                ->where('agencies.0.id', $agency->id)
                ->where('agencies.0.name', 'Agency One')
                ->where('agencies.0.saleName', 'Sale Owner'));
    }
}
