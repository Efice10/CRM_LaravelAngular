import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, user);
  }
  
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${id}`);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.apiUrl}/destroy/${id}`;
    return this.http.delete(url);
  }
}
