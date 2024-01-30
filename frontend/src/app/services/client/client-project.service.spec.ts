import { TestBed } from '@angular/core/testing';

import { ClientProjectService } from './client-project.service';

describe('ClientProjectService', () => {
  let service: ClientProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
