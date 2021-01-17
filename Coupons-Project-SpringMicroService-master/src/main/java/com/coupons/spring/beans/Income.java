package com.coupons.spring.beans;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Income {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private String name;
	private Date date;
	@Enumerated(EnumType.STRING)
	private IncomeType description;
	private String userType;
	private long userID;
	private double amount;
	
	public Income(long id, String name, Date date, IncomeType description, String userType, long userID, double amount) {
		this.id = id;
		this.name = name;
		this.date = date;
		this.description = description;
		this.userType = userType.toString();
		this.userID = userID;
		this.amount = amount;
	}
	
	public Income() {
	}
		
	@Override
	public String toString() {
		return "Income [id=" + id + ", name=" + name + ", date=" + date + ", description=" + description + ", userType="
				+ userType + ", amount=" + amount + "]";
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public IncomeType getDescription() {
		return description;
	}

	public void setDescription(IncomeType description) {
		this.description = description;
	}
	
	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}	

	public long getUserID() {
		return userID;
	}

	public void setUserID(long userID) {
		this.userID = userID;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}
	
	
	
	
}
