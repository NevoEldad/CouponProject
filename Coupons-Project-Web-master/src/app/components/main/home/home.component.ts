import { Component, OnInit } from '@angular/core';
import { ServerInfo } from '../../../models/serverInfo';
import { ApplicationResponse } from '../../../models/applicationResponse';
import { ServerService } from '../../../services/main/server.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  serverInfo: ServerInfo;
  response: ApplicationResponse;

  constructor(private serverService: ServerService) { 
  }

  ngOnInit() {
    this.serverService.getServerDbInfo().subscribe( res => this.serverInfo = res );
  }

  
  public updateServerInfo(){
    this.serverService.updateServerDbInfo(this.serverInfo).subscribe(
      res => {
      this.response = res;
      if (res.responseCode == 0) {
        this.response.alertType = "danger";
      } else if (res.responseCode == 1) {
        this.response.alertType = "success";
      } else {
        this.response.alertType = "warning";
      }
    },
    err => {
      this.response = err.error;
      this.response.alertType = "danger";
    });
  }

  public generateDatabaseInfo() {
    this.serverService.generateDataBaseTables().subscribe(
      res => {
      this.response = res;
      if (res.responseCode == 0) {
        this.response.alertType = "danger";
      } else if (res.responseCode == 1) {
        this.response.alertType = "success";
      } else {
        this.response.alertType = "warning";
      }
    },
    err => {
      this.response = err.error;
      this.response.alertType = "danger";
    });
  }
}
