import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl = 'http://127.0.0.1:8000/api/organizations'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createOrganization(organization: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, organization);
  }

  updateOrganization(organization: any): Observable<any> {
    const url = `${this.apiUrl}/${organization.id}`;
    return this.http.put<any>(url, organization);
  }

  deleteOrganization(organization: any): Observable<any> {
    const url = `${this.apiUrl}/${organization.id}`;
    return this.http.delete(url);
  }
}
