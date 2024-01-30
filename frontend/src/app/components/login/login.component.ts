import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Declare the loginForm property
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private userService: UserService,
  ) { 
    this.userService.getUserInfo().subscribe((data: any) => {
      this.user = data;
      console.log('User Object:', this.user);
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  onSubmit(): void {
    console.log('Submit button clicked');
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response: any) => {
          const token = response.token;
          if (token) {
            this.tokenService.handleData(token);
            // Redirect or perform actions on successful login
            window.location.reload();
            this.router.navigateByUrl('/dashboard');
            
          }
        },
        (error: any) => {
          console.error('Login error:', error);
          this.router.navigateByUrl('/forbidden');
          // Handle error (display error message, etc.)
        }
      );
    }
  }
  
}