<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MovieController;
use App\Http\Middleware\JWTMiddleware;
use App\ResponseHelper;
use Illuminate\Http\Request;

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
    // Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');

    Route::get("login", function () {
        return ResponseHelper::buildUnauthorizedResponse();
    })->name("login");
});

Route::prefix("/movies")->group(function () {
    Route::get('/', [MovieController::class, 'getMovies']);
    Route::get('/{id}', [MovieController::class, 'getMovie'])->middleware(JWTMiddleware::class);
    Route::post('/create', [MovieController::class, 'createMovie'])->middleware(JWTMiddleware::class);
    Route::patch('/{id}', [MovieController::class, 'editMovie'])->middleware(JWTMiddleware::class);
    Route::delete('/{id}', [MovieController::class, 'deleteMovie'])->middleware(JWTMiddleware::class);

    Route::post('/{id}/buy', [MovieController::class, 'buy'])->middleware(JWTMiddleware::class);
    Route::post('/{id}/rent', [MovieController::class, 'rent'])->middleware(JWTMiddleware::class);
});
