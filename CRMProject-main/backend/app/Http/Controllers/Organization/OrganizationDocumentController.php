<?php

namespace App\Http\Controllers\Organization;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\StoreDocumentRequest;
use App\Models\Organization;
use App\Services\DocumentService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;

class OrganizationDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\Organization  $organization
     * @return \Illuminate\Http\Response
     */
    public function index(Organization $organization)
    {
        $this->authorize('view', $organization);

        $documents = $organization
            ->media()
            ->latest()
            ->with('model:id')
            ->paginate(10);

        return response()->json([
            'organization' => $organization,
            'documents' => $documents,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Document\StoreDocumentRequest  $request
     * @param  \App\Models\Organization  $organization
     * @param  \App\Services\DocumentService  $documentService
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDocumentRequest $request, Organization $organization, DocumentService $documentService)
    {
        $this->authorize('create', Document::class);

        try {
            $documentService->store($organization, $request->file('document'));
            return response()->json(['message' => 'File uploaded successfully']);
        }
        catch (UploadException $exception) {
            return response()->json(['error' => 'Failed to upload the file'], 500);
        }
    }
}
