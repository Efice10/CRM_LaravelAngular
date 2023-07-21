import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  getTasks(user: any, filters: any): Observable<{ user: any, tasks: any[] }> {
    const url = `${this.baseUrl}/users/${user.id}/tasks`;
    return this.http.get<{ user: any, tasks: any[] }>(url, { params: filters });
  }
}
