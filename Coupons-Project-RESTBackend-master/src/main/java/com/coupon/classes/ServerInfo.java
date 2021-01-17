package com.coupon.classes;

public class ServerInfo {

	
	private String dbName, userName, password, port;

	public ServerInfo(String dbName, String userName, String password, String port) {
		this.dbName = dbName;
		this.userName = userName;
		this.password = password;
		this.port = port;
	}

	public ServerInfo() {
	}

	public String getDbName() {
		return dbName;
	}

	public void setDbName(String dbName) {
		this.dbName = dbName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	@Override
	public String toString() {
		return "ServerInfo [dbName=" + dbName + ", userName=" + userName + ", password=" + password + "]";
	}
	
	
	
}
