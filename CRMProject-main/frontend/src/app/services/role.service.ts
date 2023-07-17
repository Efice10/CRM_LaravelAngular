import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://127.0.0.1:8000'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/roles`);
  }

  createRole(roleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/roles`, roleData);
  }

  updateRole(roleId: number, roleData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/roles/${roleId}`, roleData);
  }

  deleteRole(roleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/roles/${roleId}`);
  }
}