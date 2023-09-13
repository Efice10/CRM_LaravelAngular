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
  registerForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public organizationService: OrganizationService,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      website: [''],
      address: [''],
      description: [''],
    });
  }
  
  organization: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCompanyDetails(+id);
    } else {
      console.error('Invalid user ID');
    }
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
}
