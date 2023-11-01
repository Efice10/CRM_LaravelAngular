import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from 'src/app/services/client/client.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-client',
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.scss']
})
export class TableClientComponent implements OnInit{
  displayedColumns: string[] = ['id', 'companyName', 'name', 'email', 'phone', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private clientService: ClientService, private router: Router) {}

  clients : any;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Make an HTTP request to your backend API to fetch the data
    this.clientService.getClients().subscribe((response: any) => {
      // Extract the array of clients from the "data" property of the response
      const clients = response.data;
  
      // Sort the array of clients based on the "id" property
      const sortedClients = clients.sort((a: any, b: any) => a.id - b.id);
      
      // Update your MatTableDataSource with the sorted clients
      this.dataSource = new MatTableDataSource(sortedClients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  

  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe(
      res => {
        this.clients = this.clients.filter((a: any) => a.id !== id);
        this.loadData();
        this.router.navigate(['/table-client']);
      },
      error => {
        console.error('Error deleting client:', error);
        // an error message
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
