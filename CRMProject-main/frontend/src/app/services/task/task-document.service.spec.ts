import { TestBed } from '@angular/core/testing';

import { TaskDocumentService } from './task-document.service';

describe('TaskDocumentService', () => {
  let service: TaskDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
