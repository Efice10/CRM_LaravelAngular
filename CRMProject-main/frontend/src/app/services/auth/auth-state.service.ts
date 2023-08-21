import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from './token.service'; 
@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn()!);
  userAuthState = this.userState.asObservable();
  public userRole = new BehaviorSubject<string>('');

  constructor(public token: TokenService) {}

  setAuthState(value: boolean) {
    this.userState.next(value);
  }

  setUserRole(role: string) {
    this.userRole.next(role);
  }

  getUserRole() {
    return this.userRole.asObservable();
  }

}