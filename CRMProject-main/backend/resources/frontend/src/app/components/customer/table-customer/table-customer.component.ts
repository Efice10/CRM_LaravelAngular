import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaskService } from 'src/app/services/task/task.service'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['./table-customer.component.scss']
})
export class TableCustomerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'project', 'assigned', 'created_at', 'status', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private taskService: TaskService, private router: Router) {}

  customer : any;
  clients : any;
  users : any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Make an HTTP request to your backend API to fetch the data
    this.taskService.getTasks().subscribe((data:any) => {
      // Extract the array of users from the "data" property of the response
      const project = data;
      this.dataSource = new MatTableDataSource(project);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  deleteCustomer(id: number) {
    this.taskService.deleteTask(id).subscribe(
      res => {
        this.customer = this.customer.filter((a: any) => a.id !== id);
        this.loadData();
        this.router.navigate(['/table-customer']);
      },
      error => {
        console.error('Error deleting customer:', error);
        // an error message
      }
    );
  }

  showCustomer(id: number): void {
    this.router.navigate(['/show-customer', id]);
  }

  editCustomer(id:number){
    this.router.navigate(['/edit-customer', id]);
  }
}