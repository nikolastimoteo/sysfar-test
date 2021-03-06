<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'API\v1', 'prefix' => 'v1'], function () {
    Route::post('auth/login', 'AuthController@login');
    Route::group(['middleware' => 'auth:api'], function(){
        Route::post('auth/logout', 'AuthController@logout');
        Route::get('auth/user', 'AuthController@getUser');
        Route::get('clients/search', 'ClientController@search');
        Route::apiResource('clients', 'ClientController');
    });
});
