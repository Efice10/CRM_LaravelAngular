import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization/organization.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit{
  client: any;
  organizations: any[]=[];
  selectedOrganizationId: number | undefined;
  registerForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public clientService: ClientService,
    public organizationService: OrganizationService,
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      organization: [''],

    });
  }
  ngOnInit() {
    this.fetchClients();

  }
  onSubmit() {
    this.clientService.createClient(this.registerForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['/table-client']);
      }
    );
  }
  fetchOrganization() {
    this.organizationService.getOrganizations().subscribe(
      organization => {
        this.organizations = organization;
      },
      error => {
        console.error('Error fetching company:', error);
      }
    );
  }
  fetchClients() {
    this.clientService.getClients().subscribe(
      client => {
        this.client = client;
      },
      error => {
        console.error('Error fetching company:', error);
      }
    );
  }
}

