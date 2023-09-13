import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  user: any; 
  id:any;
  constructor(private http: HttpClient, private userService: UserService, private route: ActivatedRoute,
    public router :Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadUserDetails(+id);
    } else {
      console.error('Invalid user ID');
    }
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

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      res => {
        this.user = this.user.filter((a: any) => a.id !== id);
        this.loadUserDetails(id);
      },
      error => {
        console.error('Error deleting user:', error);
        // Handle error, such as showing an error message
      }
    );
  }

  editUser(id:number){
    this.router.navigate(['/edit-user', id]);
  }
}
