import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCouponViewComponent } from './customer-coupon-view.component';

describe('CustomerCouponViewComponent', () => {
  let component: CustomerCouponViewComponent;
  let fixture: ComponentFixture<CustomerCouponViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerCouponViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerCouponViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
