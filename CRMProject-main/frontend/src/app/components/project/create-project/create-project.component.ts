import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { ClientService } from 'src/app/services/client/client.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit{
  clients: any[] = [];
  users: any[] = [];
  selectedOrganizationId: number | undefined;
  registerForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public projectService: ProjectService,
    public clientService: ClientService,
    public userService: UserService
  ) {
    this.registerForm = this.fb.group({
      title: [''],
      status: [''],
      phone: [''],
      organization: [''],

    });
  }
  ngOnInit() {
    this.fetchClients();

  }
  onSubmit() {
    this.projectService.createProject(this.registerForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['/list-project']);
      }
    );
  }
  fetchClients() {
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
      },
      error => {
        console.error('Error fetching clients:', error);
      }
    );
  }
  
  fetchUsers(){
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error fetching users:', error);
        //named manager here
      }
    )
  }
}
