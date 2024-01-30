import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    // Implement logic to send a GET request with filters
    return this.http.get(`${this.apiUrl}/customers`);
  }

  getCustomer(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/customers/${id}`);
  }

  createCustomer(customer: any): Observable<any> {
    // Implement logic to send a POST request with customers data
    return this.http.post(`${this.apiUrl}/customers`, customer);
  }

  updateCustomer(id: number, customer: any): Observable<any> {
    // Implement logic to send a PUT request with customers data
    return this.http.put(`${this.apiUrl}/customers/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<any> {
    // Implement logic to send a DELETE request
    return this.http.delete(`${this.apiUrl}/customers/${id}`);
  }
}
