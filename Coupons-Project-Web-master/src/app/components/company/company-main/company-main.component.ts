import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { UserType } from '../../../models/userType';
import { LoginService } from '../../../services/main/login.service';

@Component({
  selector: 'app-company-main',
  templateUrl: './company-main.component.html',
  styleUrls: ['./company-main.component.css']
})
export class CompanyMainComponent implements OnInit {
  coupons: boolean;
  couponsToSend: any[];
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private router: Router, private sessionService: LoginService) { }

  ngOnInit() {
    this.sessionService.checkSession().subscribe(res => {
      if(!(res === UserType.COMPANY.toUpperCase()))
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
