import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RoleService } from 'src/app/services/role/role.service';
import { AbilityService } from 'src/app/services/ability/ability.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent implements OnInit{

  roleForm: FormGroup;
  roles: any;
  abilities: any;
  role: any = {};

  constructor(
    public router: Router,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private roleService: RoleService,
    private abilityService: AbilityService,
    public http: HttpClient,
  ){
    this.roleForm = this.fb.group({
      permissions:[''],
    });
  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRoles(+id);
    } else {
      console.error('Invalid user ID');
    }

      this.abilityService.getAbilities().subscribe((data:any)=>{
        this.abilities = data;
      })
  }
  loadRoles(id: number){
    this.roleService.getRole(id).subscribe( 
      (role) => {
        this.role = role;
        console.log(role);
      },
      (error) => {
        console.error('Error loading role data:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      // Call the client service to create a new client
      this.roleService.updateRole(this.role.id, this.roleForm.value).subscribe(
        (result) => {
          // Handle successful form submission here
          console.log('Role edited successfully:', result);
          this.router.navigate(['/list-role']);
        },
        (error) => {
          // Handle error, show client-friendly message or log the error
          console.error('Error occurred while creating role:', error);
        }
      );
    } else {
      // Mark form controls as touched to highlight validation errors
      this.markFormControlsAsTouched();
    }
  }

  // Helper method to mark all form controls as touched
  private markFormControlsAsTouched() {
    Object.values(this.roleForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

}
