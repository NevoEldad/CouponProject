import { UserType } from "./userType";

export class LoginInfo {

    constructor(public userName: string, public password: string, public userType: UserType) {

    }
}