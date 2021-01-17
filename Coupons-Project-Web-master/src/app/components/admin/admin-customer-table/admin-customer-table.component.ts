import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminService } from '../../../services/admin/admin.service';
import { Income } from '../../../models/income';
import { IncomeType } from '../../../models/incomeType';

@Component({
  selector: 'app-admin-customer-table',
  templateUrl: './admin-customer-table.component.html',
  styleUrls: ['./admin-customer-table.component.css']
})
export class AdminCustomerTableComponent implements OnInit {

  customers: any[];
  customerForIncome: any;
  customerIncome: Income[];
  modalRef: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.adminService.getAllCustomers().subscribe(
      res => {
        if (res instanceof Array) {
          res.forEach(customerElement => {
            customerElement.toRemove = false;
            customerElement.toUpdate = false;
            customerElement.color = "lightgray"
          });
          this.customers = res;
        }
      },
      err => {

      }
    );
  }

  public addCustomerToArray(customer) {
    this.customers.push(customer);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  public updateSelectedCustomers() {
    this.customers.forEach(customer => {
      if (customer.toUpdate == true && customer.color != "red")
        this.updateCustomer(customer).then();
    });
  }

  public removeSelectedCustomers() {
    this.customers.forEach(customer => {
      if (customer.toRemove == true)
        this.removeCustomer(customer).then(() => {
          for (let i = 0; i < this.customers.length; i++) {
            if (this.customers[i].id == customer.id) {
              this.customers.splice(i, 1);
              break;
            }
          }
        });
    });
  }

  async updateCustomer(customer) {
    return this.adminService.updateCustomer(customer).subscribe(
      res => {
        if (res.responseCode == 0) {
          customer.color = "red";
        } else if (res.responseCode == 1) {
          customer.color = "lightgray";
        }
      },
      err => {
        customer.color = "red";
        console.log(err.error);
      }
    );;
  }

  async removeCustomer(customer) {
    this.adminService.removeCustomer(customer.id).subscribe(
      res => {
        if (res.responseCode == 0) {
          customer.color = "red";
        } else if (res.responseCode == 1) {
          return;
        }
      },
      err => {
        customer.color = "red";
        console.log(err.error);
      }
    );
  }

  public fixArray(array) {
    array.forEach(incomeElement => {
      for (var enumMember in IncomeType) {
        if (incomeElement.description == enumMember)
          incomeElement.description = IncomeType[enumMember];
      }
      incomeElement.color = "lightgray"
      incomeElement.date = JSON.stringify(incomeElement.date).slice(0, (JSON.stringify(incomeElement.date).length - 6)) + '"';
      var date: Date = new Date(JSON.parse(incomeElement.date));
      incomeElement.date = date.toDateString();
    });
    return array;
  }

  public loadIncome(customer) {
    this.customerForIncome = customer;
    this.adminService.viewIncomeByCustomer(this.customerForIncome.id).subscribe(
      res => {
        if (res instanceof Array) {
          this.customerIncome = this.fixArray(res);
        }
      }
    );
  }

  public passwordChanged(password) {
    if (password == "" || password == null) {
      return "red";
    }
    else
      return "SlateGrey";
  }
}
