<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\StoreDocumentRequest;
use App\Http\Requests\Document\UpdateDocumentRequest;
use App\Models\Document;
use App\Services\DocumentService;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Document $document, DocumentService $documentService)
    {
        $this->authorize('view', $document->model);

        return $documentService->download($request, $document);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Document\UpdateDocumentRequest  $request
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Document $document)
    {
        $this->authorize('update', $document);

        $document->name = $request->name;
        $document->save();

        return response()->json([
            'message' => 'Document renamed successfully',
            'document' => $document,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function destroy(Document $document)
    {
        $this->authorize('delete', $document);

        $document->delete();

        return response()->json([
            'message' => 'Document deleted successfully',
        ]);
    }
}
