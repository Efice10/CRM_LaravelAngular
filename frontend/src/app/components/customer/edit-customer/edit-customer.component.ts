import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { UserService } from 'src/app/services/user/user.service';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  editForm: FormGroup;
  errors: any = null;
  organizations:any;
  users: any;
  projects: any;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public customerService: CustomerService,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    public userService: UserService,
    public projectService: ProjectService,

  ) {
    this.editForm = this.fb.group({
      name: [''],
      status_id: [''],
      project_id: [''],
      user_id: [''],
      deadline: [''],
      description: [''],
    });
  }
  
  customer: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCustomerDetails(+id);
    } else {
      console.error('Invalid customer ID');
    }

    this.organizationService.getOrganizations().subscribe((data:any)=> {
      this.organizations = data;
    })

    this.userService.getUsers().subscribe((data:any)=> {
      this.users = data;
    })

    this.projectService.getProjects().subscribe((data:any)=> {
      this.projects = data;
    })
  }

  onSubmit(): void {
    if (this.editForm.valid) {
        this.customerService.updateCustomer(this.customer.id, this.editForm.value).subscribe(
            response => {
                console.log('Customer updated successfully:', response);
                this.router.navigate(['/table-customer']);
                // Optionally, navigate to another page or show a success message.
            },
            error => {
                console.error('Error updating customer:', error);
                // Handle the error, show an error message, etc.
            }
        );
    }
  }

  loadCustomerDetails(id: number) {
    this.customerService.getCustomer(id).subscribe(
      (customer) => {
        this.customer = customer;
      },
      (error) => {
        console.error('Error loading customer data:', error);
      }
    );
  }
}
