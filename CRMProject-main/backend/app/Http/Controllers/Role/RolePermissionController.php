<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Silber\Bouncer\Database\Role;
use Silber\Bouncer\Role as BouncerRole;

class RolePermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Silber\Bouncer\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function index(BouncerRole $role)
    {
        $this->authorize('view', $role);

        $permissions = $role
            ->abilities()
            ->orderBy('title')
            ->get();

        return response()->json(['role' => $role, 'permissions' => $permissions]);
    }
}
