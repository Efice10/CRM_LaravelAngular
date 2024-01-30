import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl = 'http://127.0.0.1:8000/api/organizations'; // Replace with your API endpoint
  private organizationId: number | null = null;
  constructor(private http: HttpClient) {}

  // Fetch a list of organizations
  getOrganizations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
    // Fetch a single organization by ID
  getOrganization(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Create a new organization
  createOrganization(organization: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, organization);
  }

  // Update an organization by ID
  updateOrganization(id: number, organization: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, organization);
  }

  // Delete an organization by ID
  deleteOrganization(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  setOrganizationId(id: number): void {
    this.organizationId = id;
  }

  getOrganizationId(): number | null {
    return this.organizationId;
  }
}
