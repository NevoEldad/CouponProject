import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerService } from '../../../services/customer/customer.service';
import { CouponType } from '../../../models/couponType';
import { ApplicationResponse } from '../../../models/applicationResponse';

@Component({
  selector: 'app-customer-coupon-view',
  templateUrl: './customer-coupon-view.component.html',
  styleUrls: ['./customer-coupon-view.component.css']
})
export class CustomerCouponViewComponent implements OnInit {

  id: number;
  date: Date;
  price: number;
  priceError: boolean;
  couponTypes = CouponType;
  type: CouponType = CouponType.RESTAURANT;
  searchUpToPrice: boolean;
  searchByType: boolean;
  response: ApplicationResponse;
  searchResponse: ApplicationResponse;
  @Input() modalRef: BsModalRef;
  @Output() sendCoupons = new EventEmitter();

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
  }

  public nullify() {
    this.response = null;
    this.searchResponse = null;
  }

  public findCouponsUpToPrice() {
    this.response = null;
    this.searchResponse = null;
    this.customerService.getPurchasedCouponsUpToPrice(this.price).subscribe(
      res => {
        if (res instanceof Array) {
          if (res.length != 0) {
            this.sendCoupons.emit(res);
            setTimeout(() => {
              this.modalRef.hide();
            }, 500);

          }else {
            this.searchResponse = new ApplicationResponse(0, "No coupons up to selected price.", "warning");
          }
        }
        else {
          this.searchResponse = res;
          this.searchResponse.alertType = "warning";
        }
      }, err => {
        this.searchResponse = err.error;
        this.searchResponse.alertType = "danger";
      }

    );
  }

  
  public findCouponsByType() {
    this.response = null;
    this.searchResponse = null;
    this.customerService.getPurchasedCouponsByType(this.type).subscribe(
      res => {
        if (res instanceof Array) {
          if (res.length != 0) {
            this.sendCoupons.emit(res);
            setTimeout(() => {
              this.modalRef.hide();
            }, 500);
          } else {
            this.searchResponse = new ApplicationResponse(0, "No coupons of specified type.", "warning");
          }
        }
        else {
          this.searchResponse = res;
          this.searchResponse.alertType = "warning";
        }
      }, err => {
        this.searchResponse = err.error;
        this.searchResponse.alertType = "danger";
      }
    );
  }

  public priceChanged(price) {
    if(price == "" || price == null || isNaN(price)) {
      this.priceError = true;
    }
    else
      this.priceError = false;
  }
}
