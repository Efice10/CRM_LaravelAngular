import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { RoleService } from 'src/app/services/role/role.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit {
  organizations:any;
  user: any;
  projects: any;
  statuses: any;
  SelectCompany: any;
  customerForm: FormGroup;
  users: any;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public projectService: ProjectService,
    public customerService: CustomerService,
    public userService: UserService,
    private organizationService: OrganizationService,
    public roleService: RoleService,
  ) {
    this.customerForm = this.fb.group({
      organization_id: [''],
      project_id: [''],
      user_id: [''],
      name: [''],
      status_id: [''],
      deadline: [''],
      description: [''],
    });
  }
  ngOnInit() {
    this.organizationService.getOrganizations().subscribe((data:any)=> {
      this.organizations = data;
    })

    this.userService.getUsers().subscribe((data:any)=> {
      this.users = data;
    })

    this.projectService.getProjects().subscribe((data:any)=> {
      this.projects = data;
    })

    this.userService.getUserInfo().subscribe((data:any)=> {
      this.user = data;
    })
  }
  createCustomer(){
    if (this.customerForm.valid) {
      // Call the project service to create a new project
      this.customerService.createCustomer(this.customerForm.value).subscribe(
        (result) => {
          // Handle successful form submission here
          console.log('Project created successfully:', result);
          this.router.navigate(['/table-customer']);
        },
        (error) => {
          // Handle error, show project-friendly message or log the error
          console.error('Error occurred while creating project:', error);
          // Optionally, reset the form after an error
          this.customerForm.reset();
        }
      );
    } else {
      // Mark form controls as touched to highlight validation errors
      this.markFormControlsAsTouched();
    }
  }

  // Helper method to mark all form controls as touched
  private markFormControlsAsTouched() {
    Object.values(this.customerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
