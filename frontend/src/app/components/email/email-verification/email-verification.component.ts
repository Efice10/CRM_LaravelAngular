import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
      // Extract parameters from the route
      const id = this.route.snapshot.params['id'];
      const hash = this.route.snapshot.params['hash'];
  
      // Perform email verification logic
      // You may want to call a service method to communicate with the backend
      console.log('Perform email verification logic with id:', id, 'and hash:', hash);
    }
}