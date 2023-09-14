<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Silber\Bouncer\BouncerFacade as Bouncer;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
{
    $this->authorize('viewAny', User::class);

    $users = User::latest()
        ->with('roles:title')
        ->paginate(10);

    return response()->json($users);
}

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', User::class);

        return response()->json($user);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\User\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
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
            'phone' => $request->email,
            'address' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $user->assign('user');
        Log::Info($input);

        return response()->json([
            'status' => true,
            'message' => 'User Created Successfully',
        ], 200);

    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage()
        ], 500);
    }
}



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $this->authorize('view', $user);

        session()->reflash();

        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $this->authorize('update', $user);

        $data = [
            'user' => $user,
        ];

        if (request()->user()->can('updateRole', $user)) {
            $data['roles'] =  Bouncer::role()->pluck('title', 'title');
        }

        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\User\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user) {
    $input = $request->validated();

    Log::Info($input);


    if (isset($input['role_title'])) {
        $role = Bouncer::role()->firstWhere('title', $input['role_title']);
        Bouncer::sync($user)->roles([$role]);
        unset($input['role_title']);
    }

    if (!$request->filled('password')) {
        unset($input['password']);
    }
    else {
        $input['password'] = Hash::make($input['password']);
    }

    $user->update($input);

    if ($request->user()->can('updateRole', $user)) {
        $data['roles'] = Bouncer::role()->pluck('title', 'title');
    }

    return response()->json([
        'message' => 'User updated successfully',
        'user' => $user
    ]);
}


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $this->authorize('delete', $user);

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
            'user' => $user
        ]);
    }
}
