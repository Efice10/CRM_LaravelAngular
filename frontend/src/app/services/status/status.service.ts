import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getStatuses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/status`);
  }
}
