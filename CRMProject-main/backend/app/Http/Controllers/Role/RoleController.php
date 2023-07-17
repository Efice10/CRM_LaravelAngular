<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use Illuminate\Http\Request;
use Silber\Bouncer\Database\Role;
use Silber\Bouncer\BouncerFacade as Bouncer;
use Silber\Bouncer\Database\Titles\RoleTitle;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', Role::class);

        $roles = Role::paginate(10);

        return response()->json(['roles' => $roles]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', Role::class);

        $permissions = Bouncer::ability()
            ->orderBy('title')
            ->get();

        return response()->json(['permissions' => $permissions]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Role\StoreRoleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Role::class);

        $role = Role::create(['name' => $request->input('name')]);

        if ($request->has('permissions')) {
            $abilities = Bouncer::ability()
                ->whereIn('title', $request->input('permissions'))
                ->get();
            Bouncer::sync($role)->abilities($abilities);
        }

        return response()->json(['message' => 'Role created successfully', 'role' => $role]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Silber\Bouncer\Database\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(BouncerRole $role)
    {
        $this->authorize('view', $role);

        return response()->json(['role' => $role]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Silber\Bouncer\Database\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function edit(BouncerRole $role)
    {
        $this->authorize('update', $role);

        $permissions = Bouncer::ability()
            ->orderBy('title')
            ->get();

        return response()->json(['role' => $role, 'permissions' => $permissions]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Role\UpdateRoleRequest  $request
     * @param  \Silber\Bouncer\Database\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BouncerRole $role)
    {
        $this->authorize('update', $role);

        if (($role->name == 'super-admin' || $role->name == 'user') && $request->input('name') != $role->name) {
            return response()->json(['error' => "{$role->title} role name could not be changed"]);
        } else {
            $role->name = $request->input('name');
            $role->title = RoleTitle::from($role)->toString();
            $role->save();
        }

        if ($request->has('permissions')) {
            $abilities = Bouncer::ability()
                ->whereIn('title', $request->input('permissions'))
                ->get();
            Bouncer::sync($role)->abilities($abilities);
        }

        return response()->json(['message' => 'Role updated successfully', 'role' => $role]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Silber\Bouncer\Database\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(BouncerRole $role)
    {
        $this->authorize('delete', $role);

        if ($role->users()->count() !== 0) {
            return response()->json(['error' => 'Role is assigned to existing users']);
        } else {
            $role->delete();

            return response()->json(['message' => 'Role deleted successfully']);
        }
    }
        // else {
            // $role->delete();

            // session()->flash('success', 'Role deleted successfully');

            // when deleting from any 'show' page, redirect to the roles index
            // $roleShowSections = ['permissions', 'users'];
            // foreach ($roleShowSections as $section) {
            //     $routeName ='roles.' . $section . '.index';
            //     if (url()->previous() === route($routeName, $role)) {
            //         return redirect()->route('roles.index');
            //     }
            // }

            // return redirect()->back();
        // }
    // }
}
