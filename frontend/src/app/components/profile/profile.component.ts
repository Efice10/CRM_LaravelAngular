import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user: any;

  constructor(
    public userService: UserService,
    private router: Router,
    ) {
    this.userService.getUserInfo().subscribe((data: any) => {
      this.user = data;
      console.log(this.user);
    });
  }
  ngOnInit() {}

  editProfile(id:number){
    this.router.navigate(['/edit-user', id]);
  }
}
