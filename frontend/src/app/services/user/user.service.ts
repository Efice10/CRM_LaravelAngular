import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

  getUserInfo(): Observable<any>{
    return this.http.get(`http://127.0.0.1:8000/api/user-info`);
  }

  createUsers(user: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    return this.http.post(this.apiUrl + 'users', body, { 'headers': headers });
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

  getUserRole(): Observable<string> {
    // Adjust the URL to match your backend API endpoint for retrieving user information
    const userApiUrl = `${this.apiUrl}/user`;

    return this.http.get<{ message: string }>(userApiUrl).pipe(
      map(response => {
        if (response.message === 'You are a super-admin') {
          return 'super-admin';
        } else if (response.message === 'You are an admin') {
          return 'admin';
        } else {
          return 'user';
        }
      })
    );
  }
}
