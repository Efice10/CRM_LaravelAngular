<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organization\StoreOrganizationRequest;
use App\Http\Requests\Organization\UpdateOrganizationRequest;
use App\Models\Organization;
use App\Models\Client;
use Illuminate\Support\Facades\Validator;
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
            ->get();

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
        try {
            //Validated
            $validateOrganization = Validator::make($request->all(), 
            [
                'name' => 'required|string|max:255|unique:organizations,name',
                'website' => 'required|string|max:255|url',
                'address' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);
    
            if ($validateOrganization->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors(),
                ], 422); // Use 422 for validation errors
            }
            
    
            $organization = Organization::create([
                'name' => $request->name,
                'website' => $request->website,
                'address' => $request->address,
                'description' => $request->description
            ]);

            Log::Info($input);
    
            return response()->json([
                'status' => true,
                'message' => 'Organization Created Successfully',
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

    public function assignUserToCompany($companyId, $userId)
    {
        $company = Company::find($companyId);
        $user = User::find($userId);

        if ($company && $user) {
            $company->users()->save($user); // Assuming you have a users() relationship in your Company model
            return response()->json(['message' => 'User assigned to company successfully'], 200);
        } else {
            return response()->json(['error' => 'Company or user not found'], 404);
        }
    }
}
