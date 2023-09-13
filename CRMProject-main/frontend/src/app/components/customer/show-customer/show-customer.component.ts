import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.scss']
})
export class ShowCustomerComponent implements OnInit{

  task: any; 
  id:any;
  constructor(private http: HttpClient, private taskService: TaskService, private route: ActivatedRoute,
    public router :Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCustomerDetails(+id);
    } else {
      console.error('Invalid customer ID');
    }
  }

  loadCustomerDetails(id: number) {
    this.taskService.getTask(id).subscribe( 
      (task) => {
        this.task = task;
      },
      (error) => {
        console.error('Error loading customer data:', error);
      }
    );
  }

  deleteCustomer(id: number) {
    this.taskService.deleteTask(id).subscribe(
      res => {
        this.task = this.task.filter((a: any) => a.id !== id);
        this.loadCustomerDetails(id);
      },
      error => {
        console.error('Error deleting customer:', error);
        // Handle error, such as showing an error message
      }
    );
  }

  editCustomer(id:number){
    this.router.navigate(['/edit-customer', id]);
  }
}
