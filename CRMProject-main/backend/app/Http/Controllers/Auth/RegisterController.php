<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(Authenticate::class)->except(['login', 'register']);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\Models\User
     */

     public function register(Request $request)
     {
         try {
             //Validated
             $validateUser = Validator::make($request->all(), 
             [
                 'name' => 'required',
                 'email' => 'required|email|unique:users,email',
                 'password' => 'required|string|confirmed|min:6',
             ]);
 
             if($validateUser->fails()){
                 return response()->json([
                     'status' => false,
                     'message' => 'validation error',
                     'errors' => $validateUser->errors()
                 ], 401);
             }
 
             $user = User::create([
                 'name' => $request->name,
                 'email' => $request->email,
                 'password' => Hash::make($request->password)
             ]);
 
             return response()->json([
                 'status' => true,
                 'message' => 'User Created Successfully',
                 'token' => $user->createToken("API TOKEN")->plainTextToken
             ], 200);
 
         } catch (\Throwable $th) {
             return response()->json([
                 'status' => false,
                 'message' => $th->getMessage()
             ], 500);
         }
     }
 
}
