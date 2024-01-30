import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization/organization.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit{
  client: any;
  organizations: any;
  editForm: FormGroup;
  errors: any = null;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public fb: FormBuilder,
    public clientService: ClientService,
    public organizationService: OrganizationService,
  ) {
    this.editForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      organization_id: [''],

    });
  }
  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUserDetails(+id);
    } else {
      console.error('Invalid employee ID');
    }
     
    this.organizationService.getOrganizations().subscribe((data:any)=>{
      this.organizations = data;
    })

  }
  onSubmit(): void {
    if (this.editForm.valid) {
      this.clientService.updateClient(this.client.id, this.editForm.value).subscribe(
          response => {
              console.log('Employee updated successfully:', response);
              this.router.navigate(['/table-client']);
              // Optionally, navigate to another page or show a success message.
          },
          error => {
              console.error('Error updating employee:', error);
              // Handle the error, show an error message, etc.
          }
      );
  }
  }
  loadUserDetails(id: number) {
    this.clientService.getClient(id).subscribe(
      (client) => {
        this.client = client;
      },
      (error) => {
        console.error('Error loading employee data:', error);
      }
    );
  }

}

