import { TestBed } from '@angular/core/testing';

import { ProjectDocumentService } from './project-document.service';

describe('ProjectDocumentService', () => {
  let service: ProjectDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
