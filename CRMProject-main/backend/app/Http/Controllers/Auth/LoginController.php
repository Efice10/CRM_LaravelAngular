<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Http\JsonResponse; 
use Illuminate\Auth\Middleware\Authenticate; 
use Illuminate\Auth\Middleware\EnsureFrontendRequestsAreStateful;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Hash;


class LoginController extends Controller
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
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        return $request->only($this->email(), 'password');
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        return new JsonResponse(['message' => 'Login successful']);
    }

    /**
     * Send the response after a failed login.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        return new JsonResponse(['message' => 'Invalid credentials'], 401);
    }

    /**
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (!Auth::attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = User::where('email', $request->email)->first();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['token' => $token]);
    }

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

     public function logout(Request $request)
     {
         Auth::user()->tokens()->delete(); // Revoke all tokens for the authenticated user
 
         return response()->json(['message' => 'Logged out successfully'], 200);
     }
}
