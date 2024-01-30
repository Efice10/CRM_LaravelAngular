import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOrganizationComponent } from './table-organization.component';

describe('TableOrganizationComponent', () => {
  let component: TableOrganizationComponent;
  let fixture: ComponentFixture<TableOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
