import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrls: ['./profile-client.component.scss']
})
export class ProfileClientComponent implements OnInit {
  client: any; 
  id:any;
  user:any;
  
  constructor(private http: HttpClient, private clientService: ClientService, private route: ActivatedRoute,
    public router :Router, private userService: UserService) {
      this.userService.getUserInfo().subscribe((data: any) => {
        this.user = data;
      });
    }

    ngOnInit() {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.loadClientDetails(+id);
      } else {
        console.error('Invalid client ID');
      }
    }
  
    loadClientDetails(id: number) {
      this.clientService.getClient(id).subscribe(
        (client) => {
          this.client = client;
          console.log(this.client);
        },
        (error) => {
          console.error('Error loading client data:', error);
        }
      );
    }

    deleteClient(id: number) {
      this.clientService.deleteClient(id).subscribe(
        res => {
          this.client = this.client.filter((a: any) => a.id !== id);
          this.loadClientDetails(id);
        },
        error => {
          console.error('Error deleting client:', error);
          // Handle error, such as showing an error message
        }
      );
    }
  
    editClient(id:number){
      this.router.navigate(['/edit-client', id]);
    }
}
