import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private user: any;
  organizationId: any;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getCSRFToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sanctum/csrf-cookie`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {}); // Adjust the API endpoint as needed
  }

  getUserRole(): string {
    return this.user && this.user.role ? this.user.role : 'admin'; // Default to 'user'
  }

  setOrganizationId(id: number): void {
    this.organizationId = id;
  }

  getOrganizationId(): number {
    return this.organizationId;
  }

}
