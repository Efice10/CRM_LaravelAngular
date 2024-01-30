import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://127.0.0.1:8000/api/'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}roles`);
  }

  getRole(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}roles/${id}`);
  }

  createRole(data: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post<any>(url, data, this.getRequestOptions());
  }

  updateRole(id: any, role: any): Observable<any> {
    return this.http.post(`${this.apiUrl}role/${id}`, role);
  }

  deleteRole(roleId: number): Observable<any> {
    const url = `${this.apiUrl}/${roleId}`;
    return this.http.delete(url, this.getRequestOptions());
  }

  private getRequestOptions() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return { headers: headers };
  }

}
 