import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-table-organization',
  templateUrl: './table-organization.component.html',
  styleUrls: ['./table-organization.component.scss']
})
export class TableOrganizationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'website', 'address', 'projects_count', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient, private organizationService: OrganizationService, 
    private router: Router, private userService: UserService
    ) {
      this.userService.getUserInfo().subscribe((data: any) => {
        this.user = data;
      });
    }

  organization: any;
  user: any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.organizationService.getOrganizations().subscribe((data:any) => {
      const organizations = data;
  
      // Sort the organizations by the id in ascending order
      const sortedOrganizations = organizations.sort((a: any, b: any) => a.id - b.id);
  
      console.log(sortedOrganizations);
      this.dataSource = new MatTableDataSource(sortedOrganizations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteCompany(id: number) {
    this.organizationService.deleteOrganization(id).subscribe(
      res => {
        this.loadData();
        this.router.navigate(['/table-organization']);

      },
      error => {
        console.error('Error deleting organization:', error);
        // Handle error, such as showing an error message
      }
    );
  }

  showCompany(id: number):void {
    this.router.navigate(['/show-organization', id]);
  }

  editCompany(id:number){
    this.router.navigate(['/edit-organization', id]);
  }
}
