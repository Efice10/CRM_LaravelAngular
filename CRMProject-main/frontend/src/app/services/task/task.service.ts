import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  getTasks(filters: any): Observable<any[]> {
    const url = `${this.baseUrl}/tasks`;
    return this.http.get<any[]>(url, { params: filters });
  }

  createTask(task: any): Observable<{ message: string, task: any }> {
    const url = `${this.baseUrl}/tasks`;
    return this.http.post<{ message: string, task: any }>(url, task);
  }

  getTask(taskId: number): Observable<any> {
    const url = `${this.baseUrl}/tasks/${taskId}`;
    return this.http.get<any>(url);
  }

  updateTask(task: any): Observable<{ message: string, task: any }> {
    const url = `${this.baseUrl}/tasks/${task.id}`;
    return this.http.put<{ message: string, task: any }>(url, task);
  }

  deleteTask(taskId: number): Observable<{ message: string }> {
    const url = `${this.baseUrl}/tasks/${taskId}`;
    return this.http.delete<{ message: string }>(url);
  }
}
