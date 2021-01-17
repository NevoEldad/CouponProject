import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerViewComponent } from './admin-customer-view.component';

describe('AdminCustomerViewComponent', () => {
  let component: AdminCustomerViewComponent;
  let fixture: ComponentFixture<AdminCustomerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCustomerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
