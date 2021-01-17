import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCouponCreateComponent } from './company-coupon-create.component';

describe('CompanyCouponCreateComponent', () => {
  let component: CompanyCouponCreateComponent;
  let fixture: ComponentFixture<CompanyCouponCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCouponCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCouponCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
