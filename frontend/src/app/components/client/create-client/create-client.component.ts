import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { HttpClient } from '@angular/common/http';
import { ClientService } from 'src/app/services/client/client.service';

// Rest of your component code

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {

  OrganizationList:any;
  UserList: any;
  clientForm: FormGroup;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private clientService: ClientService,
    private organizationService: OrganizationService,
    private userService: UserService,
    public http: HttpClient,
  ) {
    this.clientForm = this.fb.group({
      organization_id: [''],
      name: [''],
      email:[''],
      phone:[''],
    });
   }


  ngOnInit(): void {
    this.organizationService.getOrganizations().subscribe((data:any)=> {
      this.OrganizationList = data;
    })

    this.userService.getUsers().subscribe((data:any)=> {
      this.UserList = data;
    })
  }

  createClient(){
    if (this.clientForm.valid) {
      // Call the client service to create a new client
      this.clientService.createClient(this.clientForm.value).subscribe(
        (result) => {
          // Handle successful form submission here
          console.log('Client created successfully:', result);
          this.router.navigate(['/table-client']);
        },
        (error) => {
          // Handle error, show client-friendly message or log the error
          console.error('Error occurred while creating client:', error);
          // Optionally, reset the form after an error
          this.clientForm.reset();
        }
      );
    } else {
      // Mark form controls as touched to highlight validation errors
      this.markFormControlsAsTouched();
    }
  }

  // Helper method to mark all form controls as touched
  private markFormControlsAsTouched() {
    Object.values(this.clientForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
  
