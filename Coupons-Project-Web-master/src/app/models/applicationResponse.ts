import { ResponseCodes } from "./responseCodes";

export class ApplicationResponse {

    public responseCode:ResponseCodes;
    public responseMessage:string;
    public alertType:string;

    constructor(responseCode:ResponseCodes, responseMessage:string, alertType:string) {
        this.responseCode = responseCode;
        this.responseMessage = responseMessage;
        this.alertType = alertType;
    }


    
}