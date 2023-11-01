import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization/organization.service';

@Component({
  selector: 'app-create-user  ',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit{

  registerForm: FormGroup;
  errors: any = null;
  organizations: any;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public userService: UserService,
    public organizationService: OrganizationService,
  ) {
    this.registerForm = this.fb.group({
      name: ['Default Name'],
      email: ['default@example.com'],
      phone: [''],
      address: [''],
      password: [''],
      password_confirmation: [''],
    });
  }
  ngOnInit() { }

  onSubmit() {
    if (this.registerForm.valid) {
      // Call the user service to create a new user
      this.userService.createUser(this.registerForm.value).subscribe(
        (result) => {
          // Handle successful form submission here
          console.log('User created successfully:', result);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Handle error, show user-friendly message or log the error
          console.error('Error occurred while creating user:', error);
          // Optionally, reset the form after an error
          this.registerForm.reset();
        }
      );
    } else {
      // Mark form controls as touched to highlight validation errors
      this.markFormControlsAsTouched();
    }
  }

  // Helper method to mark all form controls as touched
  private markFormControlsAsTouched() {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}

