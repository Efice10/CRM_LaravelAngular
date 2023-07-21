import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://127.0.0.1:8000/roles'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getRoles(): Observable<any[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<any[]>(url);
  }

  createRole(roleData: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post<any>(url, roleData, this.getRequestOptions());
  }

  updateRole(roleId: number, roleData: any): Observable<any> {
    const url = `${this.apiUrl}/${roleId}`;
    return this.http.put<any>(url, roleData, this.getRequestOptions());
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
