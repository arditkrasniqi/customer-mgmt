<?php
// header('Access-Control-Allow-Origin','*');
// header('Access-Control-Allow-Headers','Origin, Content-Type, Authorization, X-Auth-Token');
// header('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');

use Illuminate\Http\Request;

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


Route::post('/register', [
	'uses'=>'UserController@register'
]);
Route::post('/login', [
    'uses'=>'UserController@login',
    'as'=>'login'
]);


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:api'], function () {
	Route::post('/create-customer', 'CustomerController@createCustomer');
	Route::get('/get-user-customers/{userId}', 'UserController@getCustomers');
	Route::delete('/delete-customer','UserController@deleteCustomer');
});