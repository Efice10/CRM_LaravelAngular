<?php

namespace App\Http\Controllers\Task;

use App\Http\Controllers\Controller;
use App\Http\Requests\Task\GetTasksRequest;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Http\Requests\Task\UpdateTaskRequest;
use App\Models\Project;
use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Http\Requests\Task\GetTasksRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function index(GetTasksRequest $request)
    {
        $this->authorize('viewAny', Task::class);

        $tasks = Task::filter($request->filters())
            ->latest()
            ->with(['project', 'user', 'status'])
            ->paginate(10);

        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $this->authorize('create', Task::class);

        if (is_null(Project::first())) {
            return response()->json(['error' => 'Create some projects before creating a task'], 500);
        }

        $projects = Project::pluck('id', 'title')->toArray();
        $users = User::pluck('id', 'name')->toArray();
        $statuses = Status::pluck('id', 'name')->toArray();

        return response()->json(compact('projects', 'users', 'statuses'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Task\StoreTaskRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->validated());

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task,
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        $this->authorize('view', $task);

        session()->reflash();

        return response()->json($task);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        $this->authorize('update', $task);

        $projects = Project::pluck('id', 'title')->toArray();
        $users = User::pluck('id', 'name')->toArray();
        $statuses = Status::pluck('id', 'name')->toArray();

        return response()->json([
            'task' => $task,
            'projects' => $projects,
            'users' => $users,
            'statuses' => $statuses,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Task\UpdateTaskRequest  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->validated());

        return response()->json([
            'message' => 'Task updated successfully',
            'task' => $task,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully',
        ]);

        // when deleting from any 'show' page, redirect to the tasks index
        // $projectShowSections = ['documents'];
        // foreach ($projectShowSections as $section) {
        //    $routeName ='tasks.' . $section . '.index';
        //    if (url()->previous() === route($routeName, $task)) {
        //       return redirect()->route('tasks.index');
        //    }
        // }
    }
}
