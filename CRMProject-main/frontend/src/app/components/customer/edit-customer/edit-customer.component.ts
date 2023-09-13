import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  editForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public customerService: TaskService,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      title: [''],
      status: [''],
      project: [''],
      user: [''],
      deadline: [''],
      description: [''],
    });
  }
  
  customer: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCustomerDetails(+id);
    } else {
      console.error('Invalid customer ID');
    }
  }

  onSubmit() {
    this.customerService.createTask(this.editForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.editForm.reset();
        this.router.navigate(['/table-customer']);
      }
    );
  }

  loadCustomerDetails(id: number) {
    this.customerService.getTask(id).subscribe(
      (customer) => {
        this.customer = customer;
      },
      (error) => {
        console.error('Error loading customer data:', error);
      }
    );
  }
}
