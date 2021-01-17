import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApplicationResponse } from '../../../models/applicationResponse';
import { LoginService } from '../../../services/main/login.service';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'app-store-coupon-table',
  templateUrl: './store-coupon-table.component.html',
  styleUrls: ['./store-coupon-table.component.css']
})
export class StoreCouponTableComponent implements OnInit {

  coupons: any[];
  response: ApplicationResponse;

  constructor(private sessionService: LoginService, private customerService: CustomerService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.sessionService.getStore().subscribe(
      res => {
        if (res instanceof Array)
          this.coupons = this.fixArray(res);
      }, err => {
        console.log(err);
      }
    );
  }

  public closeAlert() {
    this.response = null;
  }

  public fixArray(array) {
    array.forEach(couponElement => {
      couponElement.color = "lightgrey"
      couponElement.startDate = JSON.stringify(couponElement.startDate).slice(0, (JSON.stringify(couponElement.startDate).length - 6)) + '"';
      var date: Date = new Date(JSON.parse(couponElement.startDate));
      couponElement.startDate = date.toDateString();
      couponElement.endDate = JSON.stringify(couponElement.endDate).slice(0, (JSON.stringify(couponElement.endDate).length - 6)) + '"';
      date = new Date(JSON.parse(couponElement.endDate));
      couponElement.endDate = date.toDateString();
      couponElement.endDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    });
    return array;
  }

  public purchaseCoupon(coupon) {
    this.customerService.purchaseCoupon(coupon).subscribe(
      (res: ApplicationResponse) => {
        this.response = res;
        if (res.responseCode == 0) {
          this.response.alertType = "danger";
        } else if (res.responseCode == 1) {
          this.response.alertType = "success";
          coupon.amount--;
        } else {
          this.response.alertType = "warning";
        }
      }
    );
  }

}
