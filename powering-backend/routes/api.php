<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AutomezzoController;
use App\Http\Controllers\FilialeController;

Route::apiResource('automezzi', AutomezzoController::class);
Route::apiResource('filiali', FilialeController::class);




