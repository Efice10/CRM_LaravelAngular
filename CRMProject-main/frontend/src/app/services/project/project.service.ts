import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://127.0.0.1:8000/projects'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getProjects(filters?: any): Observable<any[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<any[]>(url, { params: filters });
  }

  createProject(project: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post<any>(url, project);
  }

  updateProject(project: any): Observable<any> {
    const url = `${this.apiUrl}/${project.id}`;
    return this.http.put<any>(url, project);
  }

  deleteProject(project: any): Observable<any> {
    const url = `${this.apiUrl}/${project.id}`;
    return this.http.delete(url);
  }
}
