import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LoggedIn = false;

  constructor() {}

  setLoggedIn(status: boolean) {
    this.LoggedIn = status;
  }

  isLoggedIn(): boolean {
    return this.LoggedIn;
  }
}