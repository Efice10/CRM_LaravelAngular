import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-user  ',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit{

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
        this.router.navigate(['/table-user']);
      }
    );
  }
}
