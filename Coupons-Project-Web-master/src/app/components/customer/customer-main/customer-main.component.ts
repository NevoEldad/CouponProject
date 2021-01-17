import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/main/login.service';
import { UserType } from '../../../models/userType';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.css']
})
export class CustomerMainComponent implements OnInit {
  coupons: boolean;
  couponsToSend: any[];
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private router: Router, private sessionService: LoginService) { }

  ngOnInit() {
    this.sessionService.checkSession().subscribe(res => {
      if(!(res === UserType.CUSTOMER.toUpperCase()))
        this.router.navigate(["/home"]);
    });
  }

  
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  public loadCoupons(couponsSent) {
    console.log(couponsSent);
    this.couponsToSend = couponsSent;
    this.coupons = true;
  }

  public openCoupons(){
    this.coupons = false;
    this.couponsToSend = null;
    setTimeout(()=> {this.coupons = true;}, 200);
  }

}
