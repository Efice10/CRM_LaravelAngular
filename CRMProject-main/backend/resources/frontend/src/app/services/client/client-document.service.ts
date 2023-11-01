import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientDocumentService {
  private apiUrl = 'http://127.0.0.1:8000/clients'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getClientDocuments(client: any): Observable<Document[]> {
    const url = `${this.apiUrl}/${client.id}/documents`;
    return this.http.get<Document[]>(url);
  }

  uploadDocument(client: any, file: File): Observable<any> {
    const url = `${this.apiUrl}/${client.id}/documents`;
    const formData = new FormData();
    formData.append('document', file);

    return this.http.post(url, formData);
  }
}
