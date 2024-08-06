<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\EmailVerificationController;
use App\Http\Controllers\api\LaptopController;
use App\Http\Controllers\api\OrderController;
use App\Http\Controllers\api\ProductController;
use App\Http\Controllers\api\UserController;
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


    Route::get('laptop',[LaptopController::class, 'index']);
    Route::get('laptop/{id}',[LaptopController::class,'store']);

    Route::get('cart',[LaptopController::class,'getLaptopCart']);
    Route::get('filter',[LaptopController::class, 'getFilter']);
    Route::post('order',[OrderController::class, 'createOrder']);
});

Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');






Route::middleware(['auth:api'])->group(function () {
    Route::get('user',[UserController::class, 'getUser']);
    Route::get('order/{status}',[OrderController::class, 'getOrder']);
});