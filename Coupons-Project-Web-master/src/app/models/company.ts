export class Company {

    id:number;
    compName:string;
    password:string;
    email:string;

    constructor(id:number, compName:string, password:string, email:string) {
        this.id = id;
        this.compName = compName;
        this.password = password;
        this.email = email;
    }

}