<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\ResponseHelper;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix("/auth")->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');

    Route::get("login", function() {
        return ResponseHelper::buildUnauthorizedResponse();
    })->name("login");
});
