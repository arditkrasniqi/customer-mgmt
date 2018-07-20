<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Customer;
use App\Http\Resources\CustomerListingResource;

class UserController extends Controller
{
    public function login(Request $request){
        dd($request->all());
    }

    public function register(Request $request){
    	$user = new User;
    	$user->name = $request['name'];
    	$user->email = $request['email'];
    	$user->password = bcrypt($request['password']);
    	$user->save();
    	return response()->json(200);
    }

    public function getCustomers($userId){
    	$customers = Customer::where('userId',$userId)->get();
    	return CustomerListingResource::collection($customers);
    }

    public function deleteCustomer(Request $request){
    	Customer::where('id',$request['customerId'])->delete();
    	return $this->getCustomers($request['userId']);
    }
}
