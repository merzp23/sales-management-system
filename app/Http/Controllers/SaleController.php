<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleRequest;
use App\Models\Sale;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class SaleController extends Controller
{
    /**
     * Display a listing of sales.
     */
    public function index(Request $request): Response
    {
        $filters = [
            'status' => $request->string('status')->toString(),
            'search' => $request->string('search')->toString(),
        ];

        $sales = Sale::query()
            ->withCount('agencies')
            ->when($filters['status'] !== '', function ($query) use ($filters) {
                $query->where('status', $filters['status']);
            })
            ->when($filters['search'] !== '', function ($query) use ($filters) {
                $search = $filters['search'];

                $query->where(function ($searchQuery) use ($search) {
                    $searchQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone_number', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Sale $sale): array => [
                'id' => $sale->id,
                'name' => $sale->name,
                'email' => $sale->email,
                'phoneNumber' => $sale->phone_number,
                'status' => $sale->status,
                'agenciesCount' => $sale->agencies_count,
                'createdAt' => $sale->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('Sales/Index', [
            'sales' => $sales,
            'filters' => $filters,
            'statusOptions' => Sale::statuses(),
        ]);
    }

    /**
     * Show the form for creating a new sale.
     */
    public function create(): Response
    {
        return Inertia::render('Sales/Create', [
            'statusOptions' => Sale::statuses(),
        ]);
    }

    /**
     * Store a newly created sale in storage.
     */
    public function store(StoreSaleRequest $request): RedirectResponse
    {
        Sale::query()->create($request->validated());

        return to_route('sales.index')->with('success', 'Sale created successfully.');
    }
}
