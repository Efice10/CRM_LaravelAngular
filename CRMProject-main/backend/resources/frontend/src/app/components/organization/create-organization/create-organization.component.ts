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
    if (this.registerForm.valid) {
      // Call the company service to create a new company
      this.organizationService.createOrganization(this.registerForm.value).subscribe(
        (result) => {
          // Handle successful form submission here
          console.log('Company created successfully:', result);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Handle error, show company-friendly message or log the error
          console.error('Error occurred while creating company:', error);
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
