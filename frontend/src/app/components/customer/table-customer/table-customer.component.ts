import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from 'src/app/services/customer/customer.service'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project/project.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-table-customer',
  templateUrl: './table-customer.component.html',
  styleUrls: ['./table-customer.component.scss']
})
export class TableCustomerComponent implements OnInit {
  user: any;

  displayedColumns: string[] = ['id', 'project', 'manager', 'status', 'name', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private customerService: CustomerService, private router: Router,
              private projectService: ProjectService, private userService: UserService) {
                this.userService.getUserInfo().subscribe((data: any) => {
                  this.user = data;
                });
              }

  customer : any;
  clients : any;
  users : any;
  projects: any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Make an HTTP request to your backend API to fetch the data
    this.customerService.getCustomers().subscribe((data:any) => {
      // Extract the array of users from the "data" property of the response
      const customer = data;
      this.dataSource = new MatTableDataSource(customer);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe(
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