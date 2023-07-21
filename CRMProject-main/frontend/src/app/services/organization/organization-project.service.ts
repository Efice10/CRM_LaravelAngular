import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationProjectService {
  private apiUrl = 'http://127.0.0.1:8000/organizations'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getProjects(organization: any, filters?: any): Observable<any[]> {
    const url = `${this.apiUrl}/${organization.id}/projects`;
    let params = new HttpParams();
    if (filters) {
      // Add filter parameters if provided
      Object.keys(filters).forEach(key => {
        params = params.set(key, filters[key]);
      });
    }
    return this.http.get<any[]>(url, { params });
  }
}
