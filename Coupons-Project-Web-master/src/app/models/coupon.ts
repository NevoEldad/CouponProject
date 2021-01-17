import { CouponType } from "./couponType";

export class Coupon {

    id: number;
    title: string;
    startDate: string;
    endDate: string;
    amount: number;
    type: CouponType;
    message: string;
    price: number;
    image: string;

    constructor(id: number, title: string, startDate: string, endDate: string,
        amount: number, type: CouponType, message: string, price: number, image: string, ) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.type = type;
        this.message = message;
        this.price = price;
        this.image = image;
    }

}