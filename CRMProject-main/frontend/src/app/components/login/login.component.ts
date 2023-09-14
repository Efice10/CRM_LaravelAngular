import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service'; 
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Declare the loginForm property

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private location: Location,
  ) {
    console.log(authService); // Check if authService is defined
    console.log(tokenService);
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
          // Handle error (display error message, etc.)
        }
      );
    }
  }
  
}
