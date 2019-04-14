<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('api')->group(function () {
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
    header('Access-Control-Allow-Credentials: true');

    //Companies
    Route::get('companies', 'CompaniesController@show');
    Route::get('companies/find-companie/{id}', 'CompaniesController@find');
    Route::post('companies/create', 'CompaniesController@store');
    Route::delete('companies/{id}', 'CompaniesController@delete');

    //Providers
    Route::get('providers', 'ProvidersController@show');
    Route::get('providers/{id}', 'ProvidersController@find');
    Route::put('providers/{id}', 'ProvidersController@update');
    Route::post('providers/filter-by', 'ProvidersController@filterBy');
    Route::post('providers/create', 'ProvidersController@store');
    Route::delete('providers/{id}', 'ProvidersController@delete');
});
