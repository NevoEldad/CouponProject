import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { CompanyService } from '../../../services/company/company.service';

@Component({
  selector: 'app-company-coupon-table',
  templateUrl: './company-coupon-table.component.html',
  styleUrls: ['./company-coupon-table.component.css']
})
export class CompanyCouponTableComponent implements OnInit {

  @Input() coupons: any[];
  modalRef: BsModalRef;

  constructor(private companyService: CompanyService, private modalService: BsModalService, private datePipe: DatePipe) { }

  ngOnInit() {
    if (this.coupons == null) {
      this.companyService.getAllCoupons().subscribe(
        res => {
          if (res instanceof Array) {
            this.coupons = this.fixArray(res);
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.coupons = this.fixArray(this.coupons);
    }
  }

  public fixArray(array) {
    array.forEach(couponElement => {
      couponElement.toRemove = false;
      couponElement.toUpdate = false;
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

  public addCouponToArray(coupon) {
    this.coupons.push(coupon);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  public updateSelectedCoupons() {
    this.coupons.forEach(coupon => {
      if (coupon.toUpdate == true && coupon.color != "red")
        this.updateCoupon(coupon).then();
    });
  }

  public removeSelectedCoupons() {
    this.coupons.forEach(coupon => {
      if (coupon.toRemove == true)
        this.removeCoupon(coupon).then(() => {
          for (let i = 0; i < this.coupons.length; i++) {
            if (this.coupons[i].id == coupon.id) {
              this.coupons.splice(i, 1);
              break;
            }
          }
        });
    });
  }

  async updateCoupon(coupon) {
    return this.companyService.updateCoupon(coupon).subscribe(
      res => {
        if (res.responseCode == 0) {
          coupon.color = "red";
          console.log(res);
        } else if (res.responseCode == 1) {
          coupon.color = "lightgrey";
        }
      },
      err => {
        coupon.color = "red";
        console.log(err.error);
      }
    );;
  }

  async removeCoupon(coupon) {
    this.companyService.removeCoupon(coupon.id).subscribe(
      res => {
        coupon.endDate = this.formatToDate(coupon.endDate);
        if (res.responseCode == 0) {
          coupon.color = "red";
        } else if (res.responseCode == 1) {
          return;
        }
      },
      err => {
        coupon.color = "red";
        console.log(err.error);
      },
      () => {
        coupon.endDate = this.formatToDate(coupon.endDate);
      }
    );
  }


  public priceChanged(price) {
    if(price == "" || price == null || isNaN(price)) {
      return "red";
    }
    else
    return"SlateGrey";
  }
  public formatToDate(date) {
    date = JSON.stringify(date).slice(0, (JSON.stringify(date).length - 6)) + '"';
    date = new Date(JSON.parse(date));
    date = date.toDateString();
    date = this.datePipe.transform(date, 'yyyy-MM-dd');
    return date;
  }
}
