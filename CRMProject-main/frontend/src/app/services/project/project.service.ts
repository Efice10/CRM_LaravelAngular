import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://127.0.0.1:8000/api/'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}projects`);
  }
  getProject(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}projects/${id}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}projects`, project);
  }

  updateProject(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}projects/${id}`, data);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}projects/${id}`);
  }
}
