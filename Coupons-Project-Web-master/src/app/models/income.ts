import { IncomeType } from "./incomeType";

export class Income {

    constructor(public id: number, public name: string, public date: string , public description: IncomeType, public userType: string, public userID: number, public amount: number){

    }
}