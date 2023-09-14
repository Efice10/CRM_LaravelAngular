import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.scss']
})
export class CreateAdminComponent implements OnInit{

  registerForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public userService: UserService,
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      password: [''],
      password_confirmation: [''],
    });
  }
  ngOnInit() {}
  onSubmit() {
    this.userService.createUser(this.registerForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['/table-admin']);
      }
    );
  }
}
