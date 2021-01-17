package com.coupon.errors;

/**
 * This class is used to create error codes that are going to be used by ApplicationResponse class.
 * @author Eldad, Tal, Julian
 *
 */
public enum ResponseCodes {
	//Error that is chosen if there is a system error.
	SYSTEM_ERROR  (0),
	//If something succeeds this is what sent to the client.
	SUCCESS       (1), 
	//Error that is sent if there is problem with login information.
	BAD_LOGIN_INFO(2),
	//Errors that don't fall in any other category.
	OTHER_ERROR   (3);
	
	private int errorCode;
	
	private ResponseCodes(int errorCode){
		this.errorCode = errorCode;
	}

	public int getErrorCode() {
		return errorCode;
	}
	
	
	
}
