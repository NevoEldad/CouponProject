import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Company } from '../../../models/company';
import { ApplicationResponse } from '../../../models/applicationResponse';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-admin-company-view',
  templateUrl: './admin-company-view.component.html',
  styleUrls: ['./admin-company-view.component.css']
})
export class AdminCompanyViewComponent implements OnInit {

  id: any;
  idError: boolean;
  company: Company;
  response: ApplicationResponse;
  searchResponse: ApplicationResponse;
  @Input() modalRef: BsModalRef;

  constructor(private adminService: AdminService) {
    this.id = null;
    this.company = null;
  }

  ngOnInit() {
  }

  public findCompanyById() {
    this.company = null;
    this.response = null;
    this.searchResponse = null;
    this.adminService.getCompany(this.id).subscribe(
      res => {
        console.log(res);
        if (res.compName != null)
          this.company = res;
        else {
          this.searchResponse = res;
          this.searchResponse.alertType = "warning";
        }
      }, err => {
        this.searchResponse = err.error;
      }
    );
  }


  public companyUpdate() {
    return this.adminService.updateCompany(this.company).subscribe(
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

  public companyRemove() {
    this.adminService.removeCompany(this.company.id).subscribe(
      res => {
        this.response = res;
        if (res.responseCode == 0) {
          this.response.alertType = "danger";
        } else if (res.responseCode == 1) {
          this.response.alertType = "success";
          setTimeout(() => {
            this.response = null;
            this.company = null;
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

  public idChanged(id){
      if(id == "" || id == null || !(Number.isInteger(+id))) {
        this.idError = true;
      }
      else
        this.idError = false;
    
  }
}
