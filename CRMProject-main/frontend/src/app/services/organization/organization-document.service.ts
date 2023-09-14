import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationDocumentService {
  private apiUrl = 'http://127.0.0.1:8000/organizations'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getDocuments(organization: any): Observable<Document[]> {
    const url = `${this.apiUrl}/${organization.id}/documents`;
    return this.http.get<Document[]>(url);
  }

  uploadDocument(organization: any, document: File): Observable<any> {
    const url = `${this.apiUrl}/${organization.id}/documents`;
    const formData = new FormData();
    formData.append('document', document);
    return this.http.post(url, formData);
  }
}
