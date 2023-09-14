<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organization\StoreOrganizationRequest;
use App\Http\Requests\Organization\UpdateOrganizationRequest;
use App\Models\Organization;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', Organization::class);

        $organizations = Organization::latest()
            ->withCount('projects')
            ->paginate(10);

        return response()->json($organizations);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', Organization::class);

        return response()->json($organization);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Organization\StoreOrganizationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOrganizationRequest $request)
    {
        dd($request->all());
        
        $organization = Organization::create($request->validated());

        Log::Info($input);

        return response()->json([
            'message' => 'Organization created successfully',
            'organization' => $organization,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function show(Organization $organization)
    {
        $this->authorize('view', $organization);

        return response()->json($organization);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function edit(Organization $organization)
    {
        $this->authorize('update', $organization);

        return response()->json($organization);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Organization\UpdateOrganizationRequest  $request
     * @param  \App\Models\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOrganizationRequest $request, Organization $organization)
    {
        $organization->update($request->validated());

        return response()->json([
            'message' => 'Organization updated successfully',
            'organization' => $organization,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function destroy(Organization $organization)
    {
        $this->authorize('delete', $organization);

        $organization->delete();

        return response()->json([
            'message' => 'Organization deleted successfully',
        ]);
    }
}
