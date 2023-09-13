import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role/role.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-roles',
  templateUrl: './show-roles.component.html',
  styleUrls: ['./show-roles.component.scss']
})
export class ShowRolesComponent implements OnInit {
  role: any; 
  id:any;
  constructor(private http: HttpClient, private roleService: RoleService, private route: ActivatedRoute,
    public router :Router) {}

    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadRoleDetails(+id);
      } else {
        console.error('Invalid role ID');
      }
    }
  
    loadRoleDetails(id: number) {
      this.roleService.getRole(id).subscribe(
        (role) => {
          this.role = role;
        },
        (error) => {
          console.error('Error loading role data:', error);
        }
      );
    }
  
    editRole(id:number){
      this.router.navigate(['/edit-roles', id]);
    }
  }