package com.coupon.classes;

/**
 * This class is used to receive login information as JSON.
 * @author Eldad, Tal, Julian
 *
 */
public class LoginInfo {

	private String username;
	private String password;
		
	public LoginInfo() {}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "Username: " + username + " Password: " + password;
	}
	
	
}
