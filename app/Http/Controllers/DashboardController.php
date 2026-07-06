<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\Sale;
use App\Models\TrackRecord;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(): Response
    {
        $trackRecordsByStatus = collect(TrackRecord::statuses())
            ->mapWithKeys(fn (string $status): array => [$status => 0])
            ->merge(
                TrackRecord::query()
                    ->selectRaw('status, count(*) as aggregate')
                    ->groupBy('status')
                    ->pluck('aggregate', 'status')
                    ->map(fn (int $count): int => $count)
            );

        return Inertia::render('Dashboard/Index', [
            'stats' => [
                'activeSales' => Sale::query()
                    ->where('status', Sale::STATUS_ACTIVE)
                    ->count(),
                'agencies' => Agency::query()->count(),
                'trackRecords' => TrackRecord::query()->count(),
                'trackRecordsByStatus' => $trackRecordsByStatus,
            ],
        ]);
    }
}
