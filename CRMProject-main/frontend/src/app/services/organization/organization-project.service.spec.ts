import { TestBed } from '@angular/core/testing';

import { OrganizationProjectService } from './organization-project.service';

describe('OrganizationProjectService', () => {
  let service: OrganizationProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
