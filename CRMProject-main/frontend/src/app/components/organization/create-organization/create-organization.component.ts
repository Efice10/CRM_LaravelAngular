import { Component } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent {

  registerForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public organizationService: OrganizationService,
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      website: [''],
      address: [''],
      description: [''],

    });
  }

  onSubmit() {
    this.organizationService.createOrganization(this.registerForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['/table-organization']);
      }
    );
  }
}
