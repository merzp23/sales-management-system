<?php

use App\Http\Controllers\AgencyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\TrackRecordController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])->name('home');

Route::controller(SaleController::class)->group(function (): void {
    Route::get('/sales', 'index')->name('sales.index');
    Route::get('/sales/create', 'create')->name('sales.create');
    Route::post('/sales', 'store')->name('sales.store');
});

Route::controller(AgencyController::class)->group(function (): void {
    Route::get('/agencies', 'index')->name('agencies.index');
    Route::get('/agencies/create', 'create')->name('agencies.create');
    Route::post('/agencies', 'store')->name('agencies.store');
});

Route::controller(TrackRecordController::class)->group(function (): void {
    Route::get('/track-records', 'index')->name('track-records.index');
    Route::get('/track-records/create', 'create')->name('track-records.create');
    Route::post('/track-records', 'store')->name('track-records.store');
});
