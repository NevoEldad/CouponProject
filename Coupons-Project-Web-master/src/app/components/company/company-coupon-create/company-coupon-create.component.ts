import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Coupon } from '../../../models/coupon';
import { CouponType } from '../../../models/couponType';
import { ApplicationResponse } from '../../../models/applicationResponse';
import { CompanyService } from '../../../services/company/company.service';

@Component({
  selector: 'app-company-coupon-create',
  templateUrl: './company-coupon-create.component.html',
  styleUrls: ['./company-coupon-create.component.css']
})
export class CompanyCouponCreateComponent implements OnInit {

  @Output() couponCreateEvent = new EventEmitter();
  @Input() modalRef: BsModalRef;
  coupon: Coupon;
  couponTypes = CouponType;
  response: ApplicationResponse;

  constructor(private modalService: BsModalService, private companyService: CompanyService) {
    this.coupon = new Coupon(null, null, null, null, null, CouponType.RESTAURANT, null, null, null);
  }

  ngOnInit() {

  }
  public couponCreate() {
    this.companyService.createCoupon(this.coupon).subscribe(res => {
      this.response = res;
      if (res.responseCode == 0) {
        this.response.alertType = "danger";
      } else if (res.responseCode == 1) {
        this.response.alertType = "success";
        this.couponCreateEvent.emit(this.coupon);
        setTimeout(() => {
          this.clear();
          this.modalRef.hide();
        }, 1000);
      } else {
        this.response.alertType = "warning";
      }
    });
  }

  public closeAlert() {
    this.response = null;
  }

  public clear() {
    this.coupon = new Coupon(null, null, null, null, null, CouponType.RESTAURANT, null, null, null);
    this.response = null;
  }
}
