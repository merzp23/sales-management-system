<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTrackRecordRequest;
use App\Models\Agency;
use App\Models\TrackRecord;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class TrackRecordController extends Controller
{
    /**
     * Display a listing of track records.
     */
    public function index(Request $request): Response
    {
        $filters = [
            'status' => $request->string('status')->toString(),
            'agencyId' => $request->string('agency_id')->toString(),
            'search' => $request->string('search')->toString(),
        ];

        $trackRecords = TrackRecord::query()
            ->with('agency.sale')
            ->when($filters['status'] !== '', function ($query) use ($filters) {
                $query->where('status', $filters['status']);
            })
            ->when($filters['agencyId'] !== '', function ($query) use ($filters) {
                $query->where('agency_id', $filters['agencyId']);
            })
            ->when($filters['search'] !== '', function ($query) use ($filters) {
                $search = $filters['search'];

                $query->where(function ($trackRecordQuery) use ($search) {
                    $trackRecordQuery
                        ->where('title', 'like', "%{$search}%")
                        ->orWhere('note', 'like', "%{$search}%")
                        ->orWhereHas('agency', function ($agencyQuery) use ($search) {
                            $agencyQuery
                                ->where('name', 'like', "%{$search}%")
                                ->orWhereHas('sale', function ($saleQuery) use ($search) {
                                    $saleQuery->where('name', 'like', "%{$search}%");
                                });
                        });
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn (TrackRecord $trackRecord): array => [
                'id' => $trackRecord->id,
                'title' => $trackRecord->title,
                'estimatedRevenue' => $trackRecord->estimated_revenue,
                'status' => $trackRecord->status,
                'note' => $trackRecord->note,
                'agency' => [
                    'id' => $trackRecord->agency->id,
                    'name' => $trackRecord->agency->name,
                ],
                'sale' => [
                    'id' => $trackRecord->agency->sale->id,
                    'name' => $trackRecord->agency->sale->name,
                ],
                'createdAt' => $trackRecord->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('TrackRecords/Index', [
            'trackRecords' => $trackRecords,
            'filters' => $filters,
            'statusOptions' => TrackRecord::statuses(),
            'agencies' => Agency::query()
                ->with('sale')
                ->orderBy('name')
                ->get()
                ->map(fn (Agency $agency): array => [
                    'id' => $agency->id,
                    'name' => $agency->name,
                    'saleName' => $agency->sale->name,
                ]),
        ]);
    }

    /**
     * Show the form for creating a new track record.
     */
    public function create(): Response
    {
        return Inertia::render('TrackRecords/Create', [
            'statusOptions' => TrackRecord::statuses(),
            'agencies' => Agency::query()
                ->with('sale')
                ->orderBy('name')
                ->get()
                ->map(fn (Agency $agency): array => [
                    'id' => $agency->id,
                    'name' => $agency->name,
                    'saleName' => $agency->sale->name,
                ]),
        ]);
    }

    /**
     * Store a newly created track record in storage.
     */
    public function store(StoreTrackRecordRequest $request): RedirectResponse
    {
        TrackRecord::query()->create($request->validated());

        return to_route('track-records.index')->with('success', 'Track record created successfully.');
    }
}
