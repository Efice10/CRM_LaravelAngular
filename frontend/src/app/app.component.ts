import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TokenService } from './services/auth/token.service';
import { AuthStateService } from './services/auth/auth-state.service';
import { AuthService } from './services/auth/auth.service';
import { Location } from '@angular/common';
import { UserService } from './services/user/user.service';
import { RoleService } from './services/role/role.service';
import { ClientService } from './services/client/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
user: any;
id: any;
isSignedIn!: boolean;
showOrganization: boolean = false;
userRole: any;
client: any;

constructor(
  private router: Router,
  private auth: AuthStateService,
  private token: TokenService,
  private authService: AuthService,
  private location: Location,
  private userService: UserService,
  private route: ActivatedRoute, 
  private roleService: RoleService,
  private clientService: ClientService,
  ){
    this.userService.getUserInfo().subscribe((data: any) => {
      this.user = data;
      console.log('User Object:', this.user);
    });
   }


ngOnInit(): void{
  this.auth.userAuthState.subscribe((val) => {
    this.isSignedIn = val;
    if (!val) {
      this.router.navigate(['/login']);
    } else {
      
      this.router.navigate(['/dashboard']);
    }
  });

  this.showOrganization = this.user.name === this.client.name;
  console.log('org Object:', this.showOrganization);


  const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUserData(+id);
    } else {
      console.error('Invalid user ID');
    }
}
signOut(): void {
  try {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      this.auth.setAuthState(false);
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  } catch (error) {
    console.error('Error during logout:', error);
    // Handle error, maybe show an error message to the user
  }
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

