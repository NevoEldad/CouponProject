package com.coupon.errors;

/**
 * This class is used to create a single type of response to the client from the server.
 * Usually it is sent as JSON to the client. 
 * @author Eldad, Tal, Julian
 *
 */
public class ApplicationResponse {

	private int responseCode;
	private String responseMessage;
	
	/*
	 * Default empty constructor.
	 */
	public ApplicationResponse() {}
	
	/**
	 * Constructor that assigns specific information to the attributes of the object.
	 * @param responseCode Error code that is going to be used.
	 * @param responseMessage Error message that is going to be used.
	 */
	public ApplicationResponse(int responseCode, String responseMessage) {
		this.responseCode = responseCode;
		this.responseMessage = responseMessage;
	}
	
	public int getResponseCode() {return responseCode;}
	public void setResponseCode(int responseCode) {this.responseCode = responseCode;}
	
	public String getResponseMessage() {return responseMessage;}
	public void setResponseMessage(String responseMessage) {this.responseMessage = responseMessage;}
		
}
