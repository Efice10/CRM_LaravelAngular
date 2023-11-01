import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TokenService } from './services/auth/token.service';
import { AuthStateService } from './services/auth/auth-state.service';
import { AuthService } from './services/auth/auth.service';
import { Location } from '@angular/common';
import { UserService } from './services/user/user.service';
import { RoleService } from './services/role/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
user: any;
id: any;
isSignedIn!: boolean;
isAdminOrSuperAdmin: boolean = false;

constructor(
  private router: Router,
  private auth: AuthStateService,
  private token: TokenService,
  private authService: AuthService,
  private location: Location,
  private userService: UserService,
  private route: ActivatedRoute, 
  private roleService: RoleService,
  ){ }

ngOnInit(): void{
  this.auth.userAuthState.subscribe((val) => {
    this.isSignedIn = val;
    if (!val) {
      this.router.navigate(['/login']);
    } else {
      
      this.router.navigate(['/dashboard']);
    }
  });
  this.roleService.getRoles().subscribe(
    (roles: any) => {
      const userRole = roles.role; // Assuming 'role' is the key representing user's role in the API response
      this.isAdminOrSuperAdmin = userRole === 'admin' || userRole === 'superadmin';
    },
    error => {
      console.error('Error fetching user roles:', error);
    }
  );
  this.userService.getUserInfo().subscribe(
    (userData: any) => {
      this.user = userData; // Assign user data to the variable
    },
    error => {
      console.error('Error fetching user information:', error);
    }
  );
}
  signOut() {
    this.auth.setAuthState(false);
    localStorage.removeItem('user');
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

  profile(){
    this.router.navigate(['/profile']);
  }

  
}

