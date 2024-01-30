import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  statistics: any;
  user: any;

  constructor(private dashboardService: DashboardService, private userService: UserService) { 
    this.userService.getUserInfo().subscribe((data: any) => {
      this.user = data;
    });
  }

  ngOnInit(): void {
    this.dashboardService.getDashboardStatistics().subscribe(
      (data) => {
        this.statistics = data;
      },
      (error) => {
        console.log('Error fetching dashboard statistics:', error);
      }
    );
  }
}

