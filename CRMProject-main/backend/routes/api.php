<?php

use Illuminate\Http\Request;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\UserProjectController;
use App\Http\Controllers\User\UserTaskController;
use App\Http\Controllers\Client\ClientController;
use App\Http\Controllers\Client\ClientDocumentController;
use App\Http\Controllers\Client\ClientProjectController;
use App\Http\Controllers\Organization\OrganizationController;
use App\Http\Controllers\Organization\OrganizationClientController;
use App\Http\Controllers\Organization\OrganizationProjectController;
use App\Http\Controllers\Organization\OrganizationDocumentController;
use App\Http\Controllers\Project\ProjectController;
use App\Http\Controllers\Project\ProjectDocumentController;
use App\Http\Controllers\Project\ProjectTaskController;
use App\Http\Controllers\Task\TaskController;
use App\Http\Controllers\Task\TaskDocumentController;
use App\Http\Controllers\Document\DocumentController;
use App\Http\Controllers\Role\RoleController;
use App\Http\Controllers\Role\RolePermissionController;
use App\Http\Controllers\Role\RoleUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->admin();
    });

    Route::get('dashboard', [DashboardController::class, 'index']);

    Route::apiResource('users', UserController::class)->except(['create', 'edit']);
    Route::get('users/{user}/projects', [UserProjectController::class, 'index']);
    Route::get('users/{user}/customer', [UserTaskController::class, 'index']);

    Route::apiResource('clients', ClientController::class)->except(['create', 'edit']);
    Route::get('clients/{client}/documents', [ClientDocumentController::class, 'index']);
    Route::post('clients/{client}/documents', [ClientDocumentController::class, 'store']);
    Route::get('clients/{client}/projects', [ClientProjectController::class, 'index']);

    Route::apiResource('organizations', OrganizationController::class);
    Route::prefix('organizations/{organization}')->group(function () {
        Route::apiResource('clients', OrganizationClientController::class)->only(['index']);
        Route::apiResource('projects', OrganizationProjectController::class)->only(['index']);
        Route::apiResource('documents', OrganizationDocumentController::class)->only(['index', 'store']);
    });

    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('projects.documents', ProjectDocumentController::class)->only(['index', 'store']);
    Route::apiResource('projects.tasks', ProjectTaskController::class)->only('index');

    Route::apiResource('tasks', TaskController::class);
    Route::get('/tasks/{task}/documents', [TaskDocumentController::class, 'index']);
    Route::post('/tasks/{task}/documents', [TaskDocumentController::class, 'store']);

    Route::get('/documents/{document}', [DocumentController::class, 'show']);
    Route::put('/documents/{document}', [DocumentController::class, 'update']);
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy']);

    Route::apiResource('roles', RoleController::class)->except('create', 'edit');
    Route::apiResource('roles.permissions', RolePermissionController::class)->only('index');
    Route::apiResource('roles.users', RoleUserController::class)->only('index');
});


Route::middleware(EnsureFrontendRequestsAreStateful::class)->group(function () {

    Route::post('login', [LoginController::class, 'login']);
    Route::post('logout', [LoginController::class, 'logout']);
});

