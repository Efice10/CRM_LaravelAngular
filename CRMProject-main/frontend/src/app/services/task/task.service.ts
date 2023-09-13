import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    // Implement logic to send a GET request with filters
    return this.http.get(`${this.apiUrl}/tasks`);
  }

  getTask(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks/${id}`);
  }

  createTask(customer: any): Observable<any> {
    // Implement logic to send a POST request with task data
    return this.http.post(`${this.apiUrl}/tasks`, customer);
  }

  updateTask(id: number, customer: any): Observable<any> {
    // Implement logic to send a PUT request with task data
    return this.http.put(`${this.apiUrl}/tasks/${id}`, customer);
  }

  deleteTask(id: number): Observable<any> {
    // Implement logic to send a DELETE request
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }
}
