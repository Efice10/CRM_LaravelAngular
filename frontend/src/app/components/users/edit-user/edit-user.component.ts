import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RoleService } from 'src/app/services/role/role.service';
import { OrganizationService } from 'src/app/services/organization/organization.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{

  editForm: FormGroup;
  users: any;
  roles: any;
  user: any;
  organizations: any;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private route: ActivatedRoute, 
    public roleService: RoleService,
    public router: Router,
    public organizationService: OrganizationService,
    ) {
    this.editForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      organization_id: [''],
      roles: [''],
      password: [''],
      password_confirmation: [''],
    });

    this.userService.getUserInfo().subscribe((data: any) => {
      this.user = data;
    });
  }

  ngOnInit() {
    this.organizationService.getOrganizations().subscribe((data:any)=> {
      this.organizations = data;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUserDetails(+id);
    } else {
      console.error('Invalid user ID');
    };
    
    this.roleService.getRoles().subscribe((data:any)=>{
      this.roles = data;
    });
  }

  loadUserDetails(id: number) {
    this.userService.getUser(id).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error loading user data:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.editForm.valid) {
        this.userService.updateUser(this.user.id, this.editForm.value).subscribe(
            response => {
                console.log('User updated successfully:', response);
                this.router.navigate(['/table-user']);
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
