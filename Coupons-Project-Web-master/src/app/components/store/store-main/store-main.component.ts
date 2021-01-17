import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../../services/main/login.service';
import { CustomerService } from '../../../services/customer/customer.service';
import { UserType } from '../../../models/userType';

@Component({
  selector: 'app-store-main',
  templateUrl: './store-main.component.html',
  styleUrls: ['./store-main.component.css']
})
export class StoreMainComponent implements OnInit {

  coupons: any[];

  constructor(private router: Router, private sessionService: LoginService, private customerService: CustomerService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.sessionService.checkSession().subscribe(res => {
      if(!(res === UserType.CUSTOMER.toUpperCase()))
        this.router.navigate(["/home"]);
       
    });
  }



}
