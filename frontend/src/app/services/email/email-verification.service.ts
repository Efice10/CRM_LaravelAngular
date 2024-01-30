// email-verification.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EmailVerificationService {
    private apiUrl = 'http://127.0.0.1:8000/api';

    constructor(private http: HttpClient) {}

    sendVerificationEmail(): Observable<any> {
        return this.http.post(`${this.apiUrl}/email/verification-notification`, {});
      }

    verifyEmail(id: string, hash: string): Observable<any> {
        const url = `${this.apiUrl}/email/verify/${id}/${hash}`;
        return this.http.get(url);
    }
}
