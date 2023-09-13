import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TokenService } from './services/auth/token.service';
import { AuthStateService } from './services/auth/auth-state.service';
import { AuthService } from './services/auth/auth.service';
import { Location } from '@angular/common';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
user: any;
id: any;
isSignedIn!: boolean;

constructor(
  private router: Router,
  private auth: AuthStateService,
  private token: TokenService,
  private authService: AuthService,
  private location: Location,
  private userService: UserService,
  private route: ActivatedRoute, 
  ){}

ngOnInit() {
  this.auth.userAuthState.subscribe((val) => {
    this.isSignedIn = val;
    if (!val) {
      this.router.navigate(['/login']);
    } else {
      
      this.router.navigate(['/dashboard']);
    }
  });

}
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['/login']);
  }

  loadUserData(id: number) {
    this.userService.getUser(id).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error loading user data:', error);
      }
    );
  }
}

