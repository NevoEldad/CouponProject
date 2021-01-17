import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ApplicationResponse } from '../../../models/applicationResponse';
import { UserType } from '../../../models/userType';
import { LoginInfo } from '../../../models/loginInfo';
import { LoginService } from '../../../services/main/login.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedInType: UserType;
  currentUserName: string;
  user: LoginInfo;
  modalRef: BsModalRef;
  admin: string = UserType.ADMIN;
  company: string = UserType.COMPANY;
  customer: string = UserType.CUSTOMER;
  guest: string = UserType.GUEST;
  response: ApplicationResponse;

  constructor(private loginService: LoginService, private modalService: BsModalService, private router: Router) {
    this.user = new LoginInfo("", "", UserType.ADMIN);
    this.response = null;
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      (res: UserType) => {
        //console.log(res);
        if (res === UserType.ADMIN.toUpperCase())
          this.loggedInType = UserType.ADMIN;
        else if (res === UserType.COMPANY.toUpperCase()) {
          this.loggedInType = UserType.COMPANY;
          this.loginService.getCompanyInformation().subscribe(
            res=> { this.currentUserName = res.compName;}
          );
        } else if (res === UserType.CUSTOMER.toUpperCase()) {
          this.loggedInType = UserType.CUSTOMER;
          this.loginService.getCustomerInfo().subscribe(
            res=> { this.currentUserName = res.custName;}
          );
        }else if (res === UserType.GUEST.toUpperCase())
          this.loggedInType = UserType.GUEST;
        else
          this.loggedInType = null;
      }
    );

  }

  public login() {
    this.loginService.login(this.user.userName, this.user.password, this.user.userType).subscribe(res => {
      this.response = res;
      if (res.responseCode == 0) {
        this.response.alertType = "danger";
      } else if (res.responseCode == 1) {
        this.response.alertType = "success";
        setTimeout(() => {
          let route: string = "admin";
          if (this.user.userType === UserType.COMPANY) {
            this.loggedInType = UserType.COMPANY;
            route = "company";
          } else if (this.user.userType === UserType.CUSTOMER) {
            this.loggedInType = UserType.CUSTOMER;
            route = "customer";
          } else {
            this.loggedInType = UserType.ADMIN;
          }
          this.currentUserName = this.user.userName;
          this.modalRef.hide();
          this.response = null;
          this.user = new LoginInfo("", "", UserType.ADMIN);
          this.router.navigate([route]);
        }, 500);
      } else {
        this.response.alertType = "warning";
      }

    },
      err => {
        this.response = err.error;
        this.response.alertType = "warning";
      });
  }

  public logout() {
    this.loginService.logout().subscribe(res => {
      this.loggedInType = UserType.GUEST;
    });
  }

  public changeUserType(userType) {
    console.log(userType);
    this.user.userType = userType;
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
