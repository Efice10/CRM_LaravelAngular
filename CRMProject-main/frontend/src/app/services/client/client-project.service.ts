import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientProjectService {
  private apiUrl = 'http://127.0.0.1:8000/clients'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getClientProjects(client: any): Observable<any[]> {
    const url = `${this.apiUrl}/${client.id}/projects`;
    return this.http.get<any[]>(url);
  }
}
