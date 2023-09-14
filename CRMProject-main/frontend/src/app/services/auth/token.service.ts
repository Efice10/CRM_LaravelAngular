import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'auth_token';

  constructor() {}

  handleData(token: any) {
    console.log('Token received:', token);
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // Verify the token
  isValidToken() {
    const token = this.getToken();
    return !!token;
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem(this.tokenKey);
    console.log('token removed')
  }
}
