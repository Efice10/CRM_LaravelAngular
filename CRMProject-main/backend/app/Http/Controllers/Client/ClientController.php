<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreClientRequest;
use App\Http\Requests\Client\UpdateClientRequest;
use App\Models\Client;
use App\Models\Organization;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', Client::class);

        $clients = Client::latest()->with('organization:id,name')->paginate(10);

        return response()->json($clients);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', Client::class);

        $organizations = Organization::pluck('id', 'name');

        return response()->json(compact('organizations'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Client\StoreClientRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreClientRequest $request)
    {
        $client = Client::create($request->validated());

        return response()->json([
            'message' => 'Client created successfully',
            'client' => $client,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        $this->authorize('view', $client);

        session()->reflash();

        return response()->json($client);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Client $client)
    {
        $this->authorize('update', $client);

        $organizations = Organization::pluck('id', 'name');

        return response()->json(compact('client', 'organizations'));
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Client\UpdateClientRequest  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->update($request->validated());

        return response()->json([
            'message' => 'Client updated successfully',
            'client' => $client,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        $this->authorize('delete', $client);

        $client->delete();

        return response()->json([
            'message' => 'Client deleted successfully',
        ]);
    }
        // when deleting from any 'show' page, redirect to the clients index
        //$clientShowSections = ['projects', 'documents'];
        //foreach ($clientShowSections as $section) {
          //  $routeName ='clients.' . $section . '.index';
            //if (url()->previous() === route($routeName, $client)) {
              //  return redirect()->route('clients.index');
            //}
        //}

        //return redirect()->back();
    //}
}
