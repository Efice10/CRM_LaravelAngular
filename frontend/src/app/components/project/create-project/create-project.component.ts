import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationService } from 'src/app/services/organization/organization.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit{
  organizations:any;
  users: any;
  statuses: any;
  projectForm: FormGroup;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public projectService: ProjectService,
    public userService: UserService,
    private organizationService: OrganizationService,
  ) {
    this.projectForm = this.fb.group({
      organization_id: [''],
      title: [''],
      user_id: [''],
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

  }
  createProject(){
    if (this.projectForm.valid) {
      // Call the project service to create a new project
      this.projectService.createProject(this.projectForm.value).subscribe(
        (result) => {
          // Handle successful form submission here
          console.log('Project created successfully:', result);
          this.router.navigate(['/list-project']);
        },
        (error) => {
          // Handle error, show project-friendly message or log the error
          console.error('Error occurred while creating project:', error);
          // Optionally, reset the form after an error
          this.projectForm.reset();
        }
      );
    } else {
      // Mark form controls as touched to highlight validation errors
      this.markFormControlsAsTouched();
    }
  }

  // Helper method to mark all form controls as touched
  private markFormControlsAsTouched() {
    Object.values(this.projectForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
