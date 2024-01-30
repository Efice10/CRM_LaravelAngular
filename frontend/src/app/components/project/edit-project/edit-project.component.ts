import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { UserService } from 'src/app/services/user/user.service';
import { OrganizationService } from 'src/app/services/organization/organization.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  editForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public projectService: ProjectService,
    private route: ActivatedRoute,
    public clientService: ClientService,
    public userService: UserService,
    private organizationService: OrganizationService,
  ) {
    this.editForm = this.fb.group({
      organization_id: [''],
      title: [''],
      user_id: [''],
      status_id: [''],
      deadline: [''],
      description: [''],
    });
    this.userService.getUserInfo().subscribe((data:any)=> {
      this.user = data;
    })
  }
  
  project: any;
  organizations:any;
  users: any;
  clients: any;
  user:any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProjectDetails(+id);
    } else {
      console.error('Invalid project ID');
    }

    this.organizationService.getOrganizations().subscribe((data:any)=> {
      this.organizations = data;
    })

    this.userService.getUsers().subscribe((data:any)=> {
      this.users = data;
    })

    this.clientService.getClients().subscribe((data:any)=> {
      this.clients = data;
    })
  }

  onSubmit(): void {
    if (this.editForm.valid) {
        this.projectService.updateProject(this.project.id, this.editForm.value).subscribe(
            response => {
                console.log('User updated successfully:', response);
                this.router.navigate(['/list-project']);
                // Optionally, navigate to another page or show a success message.
            },
            error => {
                console.error('Error updating project:', error);
                // Handle the error, show an error message, etc.
            }
        );
    }
  }

  loadProjectDetails(id: number) {
    this.projectService.getProject(id).subscribe(
      (project) => {
        this.project = project;
      },
      (error) => {
        console.error('Error loading project data:', error);
      }
    );
  }
}
