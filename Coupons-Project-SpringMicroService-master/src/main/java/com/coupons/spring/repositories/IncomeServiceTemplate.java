package com.coupons.spring.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.coupons.spring.beans.Income;
import com.coupons.spring.beans.UserType;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface IncomeServiceTemplate extends CrudRepository<Income, Long> {

	@Query("SELECT i FROM Income i WHERE i.userType = '" + UserType.CUSTOMER + "' AND i.userID = :customerID")
	Iterable<Income> viewIncomeByCustomer(@Param("customerID") long customerID);
	
	@Query("SELECT i FROM Income i WHERE i.userType = '" + UserType.COMPANY + "' AND i.userID = :companyID")
	Iterable<Income> viewIncomeByCompany(@Param("companyID") long companyID);
}
