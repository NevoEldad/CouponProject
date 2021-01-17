import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCouponViewComponent } from './company-coupon-view.component';

describe('CompanyCouponViewComponent', () => {
  let component: CompanyCouponViewComponent;
  let fixture: ComponentFixture<CompanyCouponViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCouponViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCouponViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
