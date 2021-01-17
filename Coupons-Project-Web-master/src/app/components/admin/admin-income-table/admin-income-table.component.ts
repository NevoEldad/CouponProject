import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { IncomeType } from '../../../models/incomeType';

@Component({
  selector: 'app-admin-income-table',
  templateUrl: './admin-income-table.component.html',
  styleUrls: ['./admin-income-table.component.css']
})
export class AdminIncomeTableComponent implements OnInit {

  incomes: any[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.viewAllIncome().subscribe(
      res => {
        if (res instanceof Array) {
          this.incomes = this.fixArray(res);
        }
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
}
