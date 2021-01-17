import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Company } from '../../../models/company';
import { LoginService } from '../../../services/main/login.service';
import { CompanyService } from '../../../services/company/company.service';

@Component({
  selector: 'app-company-profile-view',
  templateUrl: './company-profile-view.component.html',
  styleUrls: ['./company-profile-view.component.css']
})
export class CompanyProfileViewComponent implements OnInit {

  company: Company;
  income: number = 0;
  @Input() modalRef: BsModalRef;

  constructor(private loginService: LoginService, private companyService: CompanyService) { }

  ngOnInit() {
    this.loginService.getCompanyInformation().subscribe(
      res => {
        this.company = res;
        this.companyService.getCompanyIncome().subscribe(
          res => {
            if (res instanceof Array) {
              res.forEach(element => {
                this.income += element.amount;
              });
            }
          }
        );
      });
  }

}
