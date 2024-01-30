import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RoleService } from 'src/app/services/role/role.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent {

  displayedColumns: string[] = ['name', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private roleService: RoleService, private router: Router) {}

  roles: any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Make an HTTP request to your backend API to fetch the data
    this.roleService.getRoles().subscribe((data) => {
      // Extract the array of users from the "data" property of the response
      const roles = data;
      this.dataSource = new MatTableDataSource(roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  showRole(id: number): void {
    this.router.navigate(['/show-roles', id]);
  }

  editRole(id:number){
    this.router.navigate(['/edit-roles', id]);
  }
}
