import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCouponTableComponent } from './customer-coupon-table.component';

describe('CustomerCouponTableComponent', () => {
  let component: CustomerCouponTableComponent;
  let fixture: ComponentFixture<CustomerCouponTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCouponTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCouponTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
