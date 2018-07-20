<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;

class CustomerController extends Controller
{
    public function createCustomer(Request $request){
    	$customer = new Customer;
    	$customer->company = $request['company'];
    	$customer->name = $request['name'];
    	$customer->email = $request['email'];
    	$customer->address = $request['address'];
    	$customer->userId = $request['userId'];
    	$customer->save();
    	return response()->json(200);
    }
}
