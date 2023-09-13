import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization/organization.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-organization',
  templateUrl: './show-organization.component.html',
  styleUrls: ['./show-organization.component.scss']
})
export class ShowOrganizationComponent implements OnInit {
  organization: any; 
  id:any;
  constructor(private http: HttpClient, private organizationService: OrganizationService, private route: ActivatedRoute,
    public router :Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadOrganizationDetails(+id);
    } else {
      console.error('Invalid user ID');
    }
  }

  loadOrganizationDetails(id: number) {
    this.organizationService.getOrganization(id).subscribe( 
      (organization) => {
        this.organization = organization;
      },
      (error) => {
        console.error('Error loading user data:', error);
      }
    );
  }

  deleteCompany(id: number) {
    this.organizationService.deleteOrganization(id).subscribe(
      res => {
        this.organization = this.organization.filter((a: any) => a.id !== id);
        this.loadOrganizationDetails(id);
      },
      error => {
        console.error('Error deleting company:', error);
        // Handle error, such as showing an error message
      }
    );
  }

  editCompany(id:number){
    this.router.navigate(['/edit-organization', id]);
  }
}
