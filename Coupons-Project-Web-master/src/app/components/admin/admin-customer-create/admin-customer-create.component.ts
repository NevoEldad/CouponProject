import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Customer } from '../../../models/customer';
import { ApplicationResponse } from '../../../models/applicationResponse';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-customer-create',
  templateUrl: './admin-customer-create.component.html',
  styleUrls: ['./admin-customer-create.component.css']
})
export class AdminCustomerCreateComponent implements OnInit {

  @Output() customerCreateEvent = new EventEmitter();
  @Input() modalRef: BsModalRef;
  customer: Customer;
  response: ApplicationResponse;

  constructor(private modalService: BsModalService, private adminService: AdminService) {
    this.customer = new Customer(null, "", "");
  }

  ngOnInit() {
  }

  public customerCreate() {
    this.adminService.createCustomer(this.customer).subscribe(res => {
      this.response = res;
      if (res.responseCode == 0) {
        this.response.alertType = "danger";
      } else if (res.responseCode == 1) {
        this.response.alertType = "success";
        this.customerCreateEvent.emit(this.customer);
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
    this.customer = new Customer(null, "", "");
    this.response = null;
  }
}
