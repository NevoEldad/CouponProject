import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/main/login.service';
import { UserType } from '../../../models/userType';


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  companies: boolean;
  customers: boolean;
  income: boolean;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private router: Router, private sessionService: LoginService) { }

  ngOnInit() {
    this.sessionService.checkSession().subscribe(res => {
      if(!(res === UserType.ADMIN.toUpperCase()))
        this.router.navigate(["/home"]);
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
}
