import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Coupon } from '../../models/coupon';
import { CouponType } from '../../models/couponType';

/**
 * This service is used to give all possible functions for customer.
 */
@Injectable()
export class CustomerService {

  private serviceURL: string = "http://localhost:8080/CouponsWeb/service/CustomerService/";

  constructor(private http: HttpClient) { }

  /**
   * This method is used to send GET request to the server to view purchased coupons
   * up to specific price.
   * @param price - this parameter is used as a price up to which the coupons will be selected.
   */
  public getPurchasedCouponsUpToPrice(price: number): Observable<any> {
    return this.http.get(this.serviceURL + "coupon?price=" + price);
  }

  /**
   * This method is sued to send GET request to the server to view purchased coupons
   * by specific type.
   * @param type - this paramater is the type of coupon of which the coupons will be searched.
   */
  public getPurchasedCouponsByType(type: CouponType): Observable<any> {
    return this.http.get(this.serviceURL + "coupon?type=" + type);
  }

  public getAllPurchasedCoupons(): Observable<any> {
    return this.http.get(this.serviceURL + "coupon");
  }

  public purchaseCoupon(coupon: Coupon): Observable<any> {
    return this.http.post(this.serviceURL + "coupon", this.fixCouponDate(coupon));
  }

  public getStoreInfo(): Observable<any> {
    return this.http.get("http://localhost:8080/CouponsWeb/service/SessionService/shop");
  }

  
  private fixCouponDate(coupon: Coupon): Coupon {
    let couponToSend = new Coupon(coupon.id, coupon.title, coupon.startDate, coupon.endDate, coupon.amount, coupon.type, coupon.message, coupon.price, coupon.image);
    couponToSend.startDate = new Date(JSON.parse(JSON.stringify(coupon.startDate))).toISOString();
    couponToSend.endDate = new Date(JSON.parse(JSON.stringify(coupon.endDate))).toISOString();
    return couponToSend;
  }
}
