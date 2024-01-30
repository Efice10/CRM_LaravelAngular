import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from 'src/app/services/client/client.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-table-client',
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.scss']
})
export class TableClientComponent implements OnInit{
  user:any;

  displayedColumns: string[] = ['id', 'companyName', 'name', 'email', 'phone', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientService, private userService: UserService, private router: Router) {
    this.userService.getUserInfo().subscribe((data: any) => {
      this.user = data;
    });
  }

  clients : any;

  ngOnInit() {
    this.loadData();
  }
 
  loadData() {
    this.clientService.getClients().subscribe((data: any) => {
      const clients = data;
      const sortedClients = clients.sort((a: any, b: any) => a.id - b.id);
       this.dataSource = new MatTableDataSource(sortedClients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }
  
  
  

  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe(
      res => {
        // Filter the clients array
        this.clients = this.clients.filter((a: any) => a.id !== id);
        // Update the dataSource with the filtered data
        this.dataSource.data = this.clients;
        this.loadData();
        this.router.navigate(['/table-client']);
      },
      error => {
        console.error('Error deleting client:', error);
        // Handle error
      }
    );
  }
  

  showClient(id: number): void {
    this.router.navigate(['/profile-client', id]);
  }

  editClient(id:number){
    this.router.navigate(['/edit-client', id]);
  }
}
