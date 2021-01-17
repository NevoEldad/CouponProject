import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdminService } from '../../../services/admin/admin.service';
import { Income } from '../../../models/income';
import { IncomeType } from '../../../models/incomeType';

@Component({
  selector: 'app-admin-company-table',
  templateUrl: './admin-company-table.component.html',
  styleUrls: ['./admin-company-table.component.css']
})
export class AdminCompanyTableComponent implements OnInit {

  companies: any[];
  companyForIncome: any;
  companyIncome: Income[];
  modalRef: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.adminService.getAllCompanies().subscribe(
      res => {
        if (res instanceof Array) {
          res.forEach(companyElement => {
            companyElement.toRemove = false;
            companyElement.toUpdate = false;
            companyElement.color = "lightgray"
          });
          this.companies = res;
        }
      },
      err => {

      }
    );
  }

  public addCompanyToArray(company) {
    this.companies.push(company);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  public updateSelectedCompanies() {
    this.companies.forEach(company => {
      if (company.toUpdate == true && company.color != "red")
        this.updateCompany(company).then();
    });
  }

  public removeSelectedCompanies() {
    this.companies.forEach(company => {
      if (company.toRemove == true)
        this.removeCompany(company).then(() => {
          for (let i = 0; i < this.companies.length; i++) {
            if (this.companies[i].id == company.id) {
              this.companies.splice(i, 1);
              break;
            }
          }
        });
    });
  }

  async updateCompany(company) {
    return this.adminService.updateCompany(company).subscribe(
      res => {
        if (res.responseCode == 0) {
          company.color = "red";
        } else if (res.responseCode == 1) {
          company.color = "lightgray";
        }
      },
      err => {
        company.color = "red";
        console.log(err.error);
      }
    );;
  }

  async removeCompany(company) {
    this.adminService.removeCompany(company.id).subscribe(
      res => {
        if (res.responseCode == 0) {
          company.color = "red";
        } else if (res.responseCode == 1) {
          return;
        }
      },
      err => {
        company.color = "red";
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

  public loadIncome(company) {
    this.companyForIncome = company;
    this.adminService.viewIncomeByCompany(this.companyForIncome.id).subscribe(
      res => {
        if (res instanceof Array) {
          this.companyIncome = this.fixArray(res);
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
