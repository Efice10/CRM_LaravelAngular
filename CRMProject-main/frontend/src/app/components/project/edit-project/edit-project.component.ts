import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  editForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public projectService: ProjectService,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      title: [''],
      status: [''],
      client: [''],
      manager: [''],
      deadline: [''],
      description: [''],
    });
  }
  
  project: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProjectDetails(+id);
    } else {
      console.error('Invalid project ID');
    }
  }

  onSubmit() {
    this.projectService.createProject(this.editForm.value).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.editForm.reset();
        this.router.navigate(['/list-project']);
      }
    );
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
}
