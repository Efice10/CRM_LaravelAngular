import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService {
  private apiUrl = 'http://127.0.0.1:8000/projects'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getTasks(projectId: number): Observable<any[]> {
    const url = `${this.apiUrl}/${projectId}/tasks`;
    return this.http.get<any[]>(url);
  }
}
