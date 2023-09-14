import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss']
})
export class TableUserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  users: any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Make an HTTP request to your backend API to fetch the data
    this.userService.getUsers().subscribe((response) => {
      // Extract the array of users from the "data" property of the response
      const users = response.data;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      res => {
        this.users = this.users.filter((a: any) => a.id !== id);
        this.loadData();
      },
      error => {
        console.error('Error deleting user:', error);
        // Handle error, such as showing an error message
      }
    );
  }

  showUser(id: number): void {
    this.router.navigate(['/profile-user', id]);
  }

  editUser(id:number){
    this.router.navigate(['/edit-user', id]);
  }
}
