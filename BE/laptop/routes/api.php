<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\EmailVerificationController;
use App\Http\Controllers\api\LaptopController;
use App\Http\Controllers\api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::prefix('auth')->group(function(){
    Route::post('register',[AuthController::class, 'register']);
    Route::post('login',[AuthController::class, 'login']);
    Route::get('email/getOTP',[AuthController::class, 'getOTP']);
    Route::get('email/verifyOTP',[AuthController::class, 'verifyOTP']);
    
});

Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::get('laptop',[LaptopController::class, 'index']);