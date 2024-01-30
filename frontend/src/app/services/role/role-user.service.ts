import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleUserService {
  private apiUrl = 'http://127.0.0.1:8000/roles'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getRoleUsers(roleId: number): Observable<{ role: any, users: any[] }> {
    const url = `${this.apiUrl}/${roleId}/users`;
    return this.http.get<{ role: any, users: any[] }>(url);
  }
}
