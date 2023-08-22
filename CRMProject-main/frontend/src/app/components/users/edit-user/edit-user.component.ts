import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{

  registerForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public userService: UserService,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      address: [''],
      roles: [''],
      password: [''],
      password_confirmation: [''],
    });
  }
  
  user: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUserDetails(+id);
    } else {
      console.error('Invalid user ID');
    }
  }

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

  loadUserDetails(id: number) {
    this.userService.getUser(id).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error loading user data:', error);
      }
    );
  }
}
