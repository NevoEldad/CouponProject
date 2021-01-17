import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerTableComponent } from './admin-customer-table.component';

describe('AdminCustomerTableComponent', () => {
  let component: AdminCustomerTableComponent;
  let fixture: ComponentFixture<AdminCustomerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCustomerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
