package com.coupons.spring.utils;

/**
 * Object that is used as standard response of the server to the client.
 * @author Eldad, Tal, Julian
 *
 */
public class ApplicationResponse {

	private long responseCode;
	private String responseMessage;
	
	public ApplicationResponse(long responseCode, String responseMessage) {
		this.responseCode = responseCode;
		this.responseMessage = responseMessage;
	}
	public ApplicationResponse() {
	}
	
	public long getResponseCode() {
		return responseCode;
	}
	
	public void setResponseCode(long responseCode) {
		this.responseCode = responseCode;
	}
	
	public String getResponseMessage() {
		return responseMessage;
	}
	
	public void setResponseMessage(String responseMessage) {
		this.responseMessage = responseMessage;
	}
	
	
	
}
