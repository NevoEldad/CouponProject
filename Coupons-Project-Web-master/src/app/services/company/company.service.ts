import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CouponType } from '../../models/couponType';
import { Coupon } from '../../models/coupon';

@Injectable()
export class CompanyService {

  private serviceURL: string = "http://localhost:8080/CouponsWeb/service/CompanyService/";

  constructor(private http: HttpClient) { }

  public getCouponByID(id: number): Observable<any> {
    return this.http.get(this.serviceURL + "coupon?id=" + id);
  }

  public getCouponByType(type: CouponType): Observable<any> {
    return this.http.get(this.serviceURL + "coupon?type=" + type);
  }

  public getCouponsUpToDate(time: number): Observable<any> {
    return this.http.get(this.serviceURL + "coupon?time=" + time);
  }

  public getCouponsUpToPrice(price: number): Observable<any> {
    return this.http.get(this.serviceURL + "coupon?price=" + price);
  }


  public getAllCoupons(): Observable<any> {
    return this.http.get(this.serviceURL + "coupon");
  } 

  public createCoupon(coupon: Coupon): Observable<any> {
    return this.http.post(this.serviceURL + "coupon", this.fixCouponDate(coupon));
  }

  public updateCoupon(coupon: Coupon): Observable<any> {
    return this.http.put(this.serviceURL + "coupon", this.fixCouponDate(coupon));
  }

  public removeCoupon(id: number): Observable<any> {
    return this.http.delete(this.serviceURL + "coupon/" + id);
  }

  public getCompanyInformation(): Observable<any> {
    return this.http.get(this.serviceURL + "company");
  }

  public getCompanyIncome(): Observable<any> {
    return this.http.get(this.serviceURL + "income");
  }

  private fixCouponDate(coupon: Coupon): Coupon {
    let couponToSend = new Coupon(coupon.id, coupon.title, coupon.startDate, coupon.endDate, coupon.amount, coupon.type, coupon.message, coupon.price, coupon.image);
    couponToSend.startDate = new Date(JSON.parse(JSON.stringify(coupon.startDate))).toISOString();
    couponToSend.endDate = new Date(JSON.parse(JSON.stringify(coupon.endDate))).toISOString();
    return couponToSend;
  }
}
