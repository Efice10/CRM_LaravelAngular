import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  statistics: any;

  constructor(private dashboardService: DashboardService) { }

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

