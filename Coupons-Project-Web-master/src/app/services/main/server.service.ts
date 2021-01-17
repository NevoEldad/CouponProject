import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ServerInfo } from '../../models/serverInfo';

/**
 * This service is used to work with server database information.
 * It first pulls the database info from the server and then can update it and create tables
 * that are relevant to the project.
 */
@Injectable()
export class ServerService {

  strUrl: string = 'http://localhost:8080/CouponsWeb/service/ServerService/info';

  constructor(private http:HttpClient) { }

  /**
   * This method is used to send GET request to the server and get the server database info.
   */
  public getServerDbInfo():Observable<any> {
    return this.http.get(this.strUrl);
  }

  /**
   * This method is used to send POST request to the server 
   * with database information and update it.
   */
  public updateServerDbInfo(serverInfo:ServerInfo):Observable<any> {
    return this.http.post(this.strUrl, serverInfo);
  }

  /**
   * This method is used to send PUT request to the server and make it generate that tables
   * in the database that has been created beforehand.
   */
  public generateDataBaseTables():Observable<any> {
    return this.http.put(this.strUrl, {});
  }
}
