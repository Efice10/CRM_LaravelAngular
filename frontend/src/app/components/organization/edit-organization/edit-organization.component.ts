import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.scss']
})
export class EditOrganizationComponent implements OnInit {
  editForm: FormGroup;
  errors: any = null;
  organization: any ;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public organizationService: OrganizationService,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      name: [''],
      website: [''],
      address: [''],
      description: [''],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCompanyDetails(+id);
    } else {
      console.error('Invalid company ID');
    }
  }

  loadCompanyDetails(id: number) {
    this.organizationService.getOrganization(id).subscribe(
      (organization) => {
        this.organization = organization;
      },
      (error) => {
        console.error('Error loading company data:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editForm.valid) {
        this.organizationService.updateOrganization(this.organization.organization.id, this.editForm.value).subscribe(
            response => {
                console.log('User updated successfully:', response);
                this.router.navigate(['/table-organization']);
                // Optionally, navigate to another page or show a success message.
            },
            error => {
                console.error('Error updating user:', error);
                // Handle the error, show an error message, etc.
            }
        );
    }
  }
}
