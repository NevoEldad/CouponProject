import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserType } from '../../models/userType';

/**
 * This is the login service. It gives all tools that are needed to control user authentication.
 * In addition it is used for session management.
 */
@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  /**
   * This method is used to send login request to the server with login information
   * @param username - username that is going to be sent to the server side.
   * @param password - password that is going to be sent to the server side.
   * @param usertype - type of user that is attempting to log in. 
   * This is not sent to the server side but rather used to define path.
   */
  public login(username:string, password:string, usertype:UserType):Observable<any> {
    let pathURL = "http://localhost:8080/CouponsWeb/service/";
console.log(usertype);
    if(usertype === UserType.ADMIN)
      pathURL += "AdminService/login"
    else if(usertype === UserType.COMPANY)
      pathURL += "CompanyService/login"
    else
      pathURL += "CustomerService/login"

    let headers = (new HttpHeaders()).append('Content-Type', 'application/json');

    return this.http.post(pathURL, {
      username: username,
      password: password
    }, { headers: headers });

  }

  /**
   * This method is used to send logout request to the server side.
   * Server will invalidate the session.
   */
  public logout():Observable<any>
  {
    return this.http.get("http://localhost:8080/CouponsWeb/service/SessionService/logout");
  }

  /**
   * This method is used to send session check request to the server side.
   * It will check what type of user is logged in, or if user is logged in at all.
   */
  public checkSession():Observable<any> {
    return this.http.get("http://localhost:8080/CouponsWeb/service/SessionService/checkSession");
  }

  public getCompanyInformation(): Observable<any> {
    return this.http.get("http://localhost:8080/CouponsWeb/service/CompanyService/company");
  }

  public getCustomerInfo(): Observable<any> {
    return this.http.get("http://localhost:8080/CouponsWeb/service/CustomerService/customer");
  }

  public getStore(): Observable<any> {
    return this.http.get("http://localhost:8080/CouponsWeb/service/SessionService/shop");
  }
}
