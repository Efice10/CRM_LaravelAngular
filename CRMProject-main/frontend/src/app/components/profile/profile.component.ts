import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

export class User {
  name!: string;
  email!: string;
  phone!: string;
  address!: string;
  role!: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  
  user!: User;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (userData: any) => {
        this.user = userData;
      },
      error => {
        console.error('Error fetching user information:', error);
      } 
    );
  }
}