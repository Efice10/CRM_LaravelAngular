import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskDocumentService {
  private apiUrl = 'http://127.0.0.1:8000/tasks'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getTaskDocuments(taskId: number): Observable<Document[]> {
    const url = `${this.apiUrl}/${taskId}/documents`;
    return this.http.get<Document[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  uploadDocument(taskId: number, file: File): Observable<any> {
    const url = `${this.apiUrl}/${taskId}/documents`;
    const formData = new FormData();
    formData.append('document', file);

    return this.http.post(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.status + ' - ' + error.error.message;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
