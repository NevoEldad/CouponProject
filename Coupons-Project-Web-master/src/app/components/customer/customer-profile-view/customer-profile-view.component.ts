import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Customer } from '../../../models/customer';
import { LoginService } from '../../../services/main/login.service';

@Component({
  selector: 'app-customer-profile-view',
  templateUrl: './customer-profile-view.component.html',
  styleUrls: ['./customer-profile-view.component.css']
})
export class CustomerProfileViewComponent implements OnInit {

  customer: Customer;
  @Input() modalRef: BsModalRef;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.getCustomerInfo().subscribe(res => this.customer = res);
  }

}
