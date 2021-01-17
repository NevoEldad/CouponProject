import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Customer } from '../../../models/customer';
import { ApplicationResponse } from '../../../models/applicationResponse';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-customer-view',
  templateUrl: './admin-customer-view.component.html',
  styleUrls: ['./admin-customer-view.component.css']
})
export class AdminCustomerViewComponent implements OnInit {

  id: number;
  idError: boolean
  customer: Customer;
  response: ApplicationResponse;
  searchResponse: ApplicationResponse;
  @Input() modalRef: BsModalRef;

  constructor(private adminService: AdminService) {
    this.id = null;
    this.customer = null;
  }

  ngOnInit() {
  }

  public findCustomerById() {
    this.customer = null;
    this.response = null;
    this.searchResponse = null;
    this.adminService.getCustomer(this.id).subscribe(
      res => {
        console.log(res);
        if (res.customerName != null)
          this.customer = res;
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


  public customerUpdate() {
    return this.adminService.updateCustomer(this.customer).subscribe(
      res => {
        console.log(res);
        this.response = res;
        if (res.responseCode == 0) {
          this.response.alertType = "danger";
        } else if (res.responseCode == 1) {
          this.response.alertType = "success";
        }
      },
      err => {
        console.log(err.error);
      }
    );;
  }

  public customerRemove() {
    this.adminService.removeCustomer(this.customer.id).subscribe(
      res => {
        this.response = res;
        if (res.responseCode == 0) {
          this.response.alertType = "danger";
        } else if (res.responseCode == 1) {
          this.response.alertType = "success";
          setTimeout(() => {
            this.response = null;
            this.customer = null;
          }, 500);
        }
      },
      err => {
        console.log(err.error);
      }
    );
  }

  public closeAlert(num) {
    if (num == 1)
      this.searchResponse = null;
    else
      this.response = null;
  }

  public idChanged(id) {
    if (id == "" || id == null || !(Number.isInteger(+id))) {
      this.idError = true;
    }
    else
      this.idError = false;

  }
}
