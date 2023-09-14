import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization/organization.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {
  organizations: any[] = [];
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
    this.fetchOrganizations();

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
  fetchOrganizations() {
    this.organizationService.getOrganizations().subscribe(
      organizations => {
        this.organizations = organizations;
      },
      error => {
        console.error('Error fetching client:', error);
      }
    );
  }
}
