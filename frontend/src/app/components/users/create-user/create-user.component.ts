import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-create-user  ',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit{

  registerForm: FormGroup;
  errors: any = null;
  organizations: any;
  roles:any;
  user:any;
  
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public userService: UserService,
    public organizationService: OrganizationService,
    public roleService: RoleService,
  ){
    this.registerForm = this.fb.group({
      name: ['Farids'],
      email: ['bloodborn2.bb@gmail.com'],
      phone: ['0108053001'],
      address: ['12-19 Permai, Selangor'],
      organization_id: [''],
      roles: [''],
      password: ['password'],
      password_confirmation: ['password'],
    });
  }
  ngOnInit() {
    this.userService.getUserInfo().subscribe((data:any)=>{
      this.user  = data;
    })
    this.roleService.getRoles().subscribe((data:any)=>{
      this.roles  = data;
    })
    this.organizationService.getOrganizations().subscribe((data:any)=> {
      this.organizations = data;
    })
   }

  onSubmit() {
    if (this.registerForm.valid) {
      // Call the user service to create a new user
      this.userService.createUser(this.registerForm.value).subscribe(
        (result) => {
          // Handle successful form submission here
          console.log('User created successfully:', result);
          this.router.navigate(['/table-user']);
        },
        (error) => {
          // Handle error, show user-friendly message or log the error
          console.error('Error occurred while creating user:', error);
          // Optionally, reset the form after an error
        }
      );
    } else {
      // Mark form controls as touched to highlight validation errors 
    }
  }

  // Helper method to mark all form controls as touched
  private markFormControlsAsTouched() {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}

