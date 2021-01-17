import { Component, OnInit, EventEmitter, Output, TemplateRef, Input } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Company } from '../../../models/company';
import { ApplicationResponse } from '../../../models/applicationResponse';
import { AdminService } from '../../../services/admin/admin.service';


@Component({
  selector: 'app-admin-company-create',
  templateUrl: './admin-company-create.component.html',
  styleUrls: ['./admin-company-create.component.css']
})
export class AdminCompanyCreateComponent implements OnInit {

  @Output() companyCreateEvent = new EventEmitter();
  @Input() modalRef: BsModalRef;
  company: Company;
  response: ApplicationResponse;

  constructor(private modalService: BsModalService, private adminService: AdminService) {
    this.company = new Company(null, "", "", "");
  }

  ngOnInit() {
  }

  public companyCreate() {
    this.adminService.createCompany(this.company).subscribe(res => {
      this.response = res;
      if (res.responseCode == 0) {
        this.response.alertType = "danger";
      } else if (res.responseCode == 1) {
        this.response.alertType = "success";
        this.companyCreateEvent.emit(this.company);
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
    this.company = new Company(null, "", "", "");
    this.response = null;
  }
}
