import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProjectService } from 'src/app/services/project/project.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.scss']
})
export class ListProjectComponent implements OnInit{
  displayedColumns: string[] = ['id', 'title', 'manager', 'created_at', 'deadline', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( 
    private projectService: ProjectService, 
    private router: Router,
    private userService: UserService
    ) {
      this.userService.getUserInfo().subscribe((data: any) => {
        this.user = data;
      });
    }

  projects : any;
  users : any;
  statuses : any;
  user: any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Make an HTTP request to your backend API to fetch the data
    this.projectService.getProjects().subscribe((data:any) => {
      // Extract the array of users from the "data" property of the response
      const project = data;
      this.dataSource = new MatTableDataSource(project);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe(
      res => {
        this.projects = this.projects.filter((a: any) => a.id !== id);
        this.loadData();
        this.router.navigate(['/list-project']);
      },
      error => {
        console.error('Error deleting client:', error);
        // an error message
      }
    );
  }

  showProject(id: number): void {
    this.router.navigate(['/show-project', id]);
  }

  editProject(id:number){
    this.router.navigate(['/edit-project', id]);
  }
}
