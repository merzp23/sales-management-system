<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAgencyRequest;
use App\Models\Agency;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class AgencyController extends Controller
{
    /**
     * Display a listing of agencies.
     */
    public function index(Request $request): Response
    {
        $filters = [
            'saleId' => $request->string('sale_id')->toString(),
            'search' => $request->string('search')->toString(),
        ];

        $agencies = Agency::query()
            ->with('sale')
            ->withCount('trackRecords')
            ->when($filters['saleId'] !== '', function ($query) use ($filters) {
                $query->where('sale_id', $filters['saleId']);
            })
            ->when($filters['search'] !== '', function ($query) use ($filters) {
                $search = $filters['search'];

                $query->where(function ($agencyQuery) use ($search) {
                    $agencyQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%")
                        ->orWhere('region', 'like', "%{$search}%")
                        ->orWhereHas('sale', function ($saleQuery) use ($search) {
                            $saleQuery->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Agency $agency): array => [
                'id' => $agency->id,
                'name' => $agency->name,
                'address' => $agency->address,
                'region' => $agency->region,
                'sale' => [
                    'id' => $agency->sale->id,
                    'name' => $agency->sale->name,
                ],
                'trackRecordsCount' => $agency->track_records_count,
                'createdAt' => $agency->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('Agencies/Index', [
            'agencies' => $agencies,
            'filters' => $filters,
            'sales' => Sale::query()
                ->orderBy('name')
                ->get()
                ->map(fn (Sale $sale): array => [
                    'id' => $sale->id,
                    'name' => $sale->name,
                ]),
        ]);
    }

    /**
     * Show the form for creating a new agency.
     */
    public function create(): Response
    {
        return Inertia::render('Agencies/Create', [
            'sales' => Sale::query()
                ->orderBy('name')
                ->get()
                ->map(fn (Sale $sale): array => [
                    'id' => $sale->id,
                    'name' => $sale->name,
                    'status' => $sale->status,
                ]),
        ]);
    }

    /**
     * Store a newly created agency in storage.
     */
    public function store(StoreAgencyRequest $request): RedirectResponse
    {
        Agency::query()->create($request->validated());

        return to_route('agencies.index')->with('success', 'Agency created successfully.');
    }
}
