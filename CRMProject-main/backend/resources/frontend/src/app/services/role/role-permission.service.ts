import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {
  private apiUrl = 'http://127.0.0.1:8000/roles'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getRolePermissions(roleId: number): Observable<{ role: any, permissions: any[] }> {
    const url = `${this.apiUrl}/${roleId}/permissions`;
    return this.http.get<{ role: any, permissions: any[] }>(url);
  }
}
