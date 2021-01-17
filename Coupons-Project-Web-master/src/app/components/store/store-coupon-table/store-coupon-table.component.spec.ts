import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCouponTableComponent } from './store-coupon-table.component';

describe('StoreCouponTableComponent', () => {
  let component: StoreCouponTableComponent;
  let fixture: ComponentFixture<StoreCouponTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCouponTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCouponTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
