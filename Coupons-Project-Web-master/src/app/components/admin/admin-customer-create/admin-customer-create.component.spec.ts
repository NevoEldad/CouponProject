import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerCreateComponent } from './admin-customer-create.component';

describe('AdminCustomerCreateComponent', () => {
  let component: AdminCustomerCreateComponent;
  let fixture: ComponentFixture<AdminCustomerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCustomerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
