<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Document\StoreDocumentRequest;
use App\Models\Task;
use App\Services\DocumentService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;

class TaskDocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function index(Task $task)
    {
        $this->authorize('view', $task);

        $documents = $task
            ->media()
            ->latest()
            ->with('model:id')
            ->paginate(10);

        return response()->json([
            'task' => $task,
            'documents' => $documents,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Document\StoreDocumentRequest  $request
     * @param  \App\Models\Task  $Task
     * @param  \App\Services\DocumentService  $documentService
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDocumentRequest $request, Task $task, DocumentService $documentService)
    {
        $this->authorize('create', Document::class);

        try {
            $documentService->store($task, $request->file('document'));
            return response()->json(['message' => 'File uploaded successfully']);
        }
        catch (UploadException $exception) {
            return response()->json(['error' => 'Failed to upload the file'], 500);
        }
    }
}
