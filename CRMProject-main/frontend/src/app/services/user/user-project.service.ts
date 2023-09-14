import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProjectService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  getProjects(user: any, filters: any): Observable<{ user: any, projects: any[] }> {
    const url = `${this.baseUrl}/users/${user.id}/projects`;
    return this.http.get<{ user: any, projects: any[] }>(url, { params: filters });
  }
}
