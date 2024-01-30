import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationClientService {
  private apiUrl = 'http://127.0.0.1:8000/organizations'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getClients(organization: any): Observable<any[]> {
    const url = `${this.apiUrl}/${organization.id}/clients`;
    return this.http.get<any[]>(url);
  }
}
