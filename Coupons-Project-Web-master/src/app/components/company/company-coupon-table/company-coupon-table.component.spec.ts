import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCouponTableComponent } from './company-coupon-table.component';

describe('CompanyCouponTableComponent', () => {
  let component: CompanyCouponTableComponent;
  let fixture: ComponentFixture<CompanyCouponTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCouponTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCouponTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
