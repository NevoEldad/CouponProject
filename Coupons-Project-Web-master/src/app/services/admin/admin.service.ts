import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '../../models/company';
import { Customer } from '../../models/customer';
/**
 * This service is used to give all possible http requests to the admin.
 * It basically mirrors REST on server side.
 */
@Injectable()
export class AdminService {

  private serviceURL: string = "http://localhost:8080/CouponsWeb/service/AdminService/";
  private _COMPANY: string = "company";
  private _CUSTOMER: string = "customer";
  private _INCOME: string = "income";

  constructor(private http: HttpClient) { }

  /**
   * This method is used to get company with a specific id from the server.
   * @param id - ID of company that is going to be sent with the http request to the server.
   * Will return Company with the specified ID or ApplicationResponse inside the Observable.
   */
  public getCompany(id: string): Observable<any> {
    return this.http.get(this.serviceURL + this._COMPANY + "?id=" + id);
  }

  /**
   * This method is used to retrieve all companies from the server.
   * Will return Company[] or ApplicationResponse inside the Observable.
   */
  public getAllCompanies(): Observable<any> {
    return this.http.get(this.serviceURL + this._COMPANY);
  }

  /**
   * This method is used to send http request that will create new company in the database. 
   * @param company - Company that will be created.
   * This method can return ApplicationResponse inside the Observable.
   */
  public createCompany(company: Company): Observable<any> {
    return this.http.post(this.serviceURL +  this._COMPANY, company);
  }

  public updateCompany(company: Company): Observable<any> {
    return this.http.put(this.serviceURL +  this._COMPANY, company);
  }

  public removeCompany(id: number): Observable<any> {
    return this.http.delete(this.serviceURL +  this._COMPANY + "/" + id);
  }

  public getCustomer(id: number): Observable<any> {
    return this.http.get(this.serviceURL + this._CUSTOMER +"?id=" + id);
  }

  public getAllCustomers(): Observable<any> {
    return this.http.get(this.serviceURL + this._CUSTOMER);
  }

  public createCustomer(customer: Customer): Observable<any> {
    return this.http.post(this.serviceURL + this._CUSTOMER, customer);
  }

  public updateCustomer(customer: Customer): Observable<any> {
    return this.http.put(this.serviceURL + this._CUSTOMER, customer);
  }

  public removeCustomer(id: number): Observable<any> {
    return this.http.delete(this.serviceURL + this._CUSTOMER + "/" + id);
  }

  public viewAllIncome(): Observable<any> {
    return this.http.get(this.serviceURL + this._INCOME);
  }

  public viewIncomeByCompany(id): Observable<any> {
    return this.http.get(this.serviceURL + this._INCOME + this._COMPANY + "?id=" + id);
  }

  public viewIncomeByCustomer(id): Observable<any> {
    return this.http.get(this.serviceURL + this._INCOME + this._CUSTOMER + "?id=" + id);
  }
}
