import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.scss']
})
export class ShowProjectComponent implements OnInit{

  project: any; 
  id:any;
  constructor(private http: HttpClient, private projectService: ProjectService, private route: ActivatedRoute,
    public router :Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProjectDetails(+id);
    } else {
      console.error('Invalid project ID');
    }
  }

  loadProjectDetails(id: number) {
    this.projectService.getProject(id).subscribe( 
      (project) => {
        this.project = project;
      },
      (error) => {
        console.error('Error loading project data:', error);
      }
    );
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id).subscribe(
      res => {
        this.project = this.project.filter((a: any) => a.id !== id);
        this.loadProjectDetails(id);
      },
      error => {
        console.error('Error deleting project:', error);
        // Handle error, such as showing an error message
      }
    );
  }

  editProject(id:number){
    this.router.navigate(['/edit-project', id]);
  }
}
