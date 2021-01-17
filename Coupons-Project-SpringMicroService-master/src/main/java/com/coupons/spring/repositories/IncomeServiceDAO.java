package com.coupons.spring.repositories;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coupons.spring.beans.Income;

@Service
public class IncomeServiceDAO {

	
	@Autowired private IncomeServiceTemplate incomeRepository;
	
	
	public void storeIncome(Income income) {
		this.incomeRepository.save(income);
	}
	
	public Collection<Income> viewAllIncome(){
		return (Collection<Income>) this.incomeRepository.findAll();
	}
	
	public Collection<Income> viewIncomeByCustomer(long customerID) {
		return (Collection<Income>) this.incomeRepository.viewIncomeByCustomer(customerID);
	}
	
	public Collection<Income> viewIncomeByCompany(long companyID) {
		return (Collection<Income>) this.incomeRepository.viewIncomeByCompany(companyID);
	}
	
}
