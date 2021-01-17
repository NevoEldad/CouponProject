import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompanyTableComponent } from './admin-company-table.component';

describe('AdminCompanyTableComponent', () => {
  let component: AdminCompanyTableComponent;
  let fixture: ComponentFixture<AdminCompanyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompanyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompanyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
