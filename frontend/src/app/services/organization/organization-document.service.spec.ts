import { TestBed } from '@angular/core/testing';

import { OrganizationDocumentService } from './organization-document.service';

describe('OrganizationDocumentService', () => {
  let service: OrganizationDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
