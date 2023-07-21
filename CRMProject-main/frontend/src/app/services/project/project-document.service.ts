import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectDocumentService {
  private apiUrl = 'http://127.0.0.1:8000/projects'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getDocuments(projectId: number): Observable<Document[]> {
    const url = `${this.apiUrl}/${projectId}/documents`;
    return this.http.get<Document[]>(url);
  }

  uploadDocument(projectId: number, document: File): Observable<any> {
    const url = `${this.apiUrl}/${projectId}/documents`;
    const formData = new FormData();
    formData.append('document', document);
    return this.http.post(url, formData);
  }
}
