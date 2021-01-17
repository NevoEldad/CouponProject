package com.coupons.spring.controllers;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coupons.spring.beans.Income;
import com.coupons.spring.repositories.IncomeServiceDAO;
import com.coupons.spring.utils.ApplicationResponse;
import com.coupons.spring.utils.ResponseCodes;

/**
 * This class is used as REST that sends the information about income.
 * @author Eldad, Tal, Julian
 *
 */
@Controller
@RequestMapping(path="/IncomeService") 
public class MainController {
	@Autowired 
	private IncomeServiceDAO incomeService;
	
	/** 
	 * This method is used to store income in the database.
	 * @param income Income object that is going to be stored in the database.
	 * @return JSON with response - uses ApplicationResponse as the Object that will be sent back to client.
	 */
	@PostMapping(path="/income")
	public @ResponseBody ApplicationResponse storeIncome (@RequestBody Income income) {
		income.setDate(new Date());
		this.incomeService.storeIncome(income);
		return new ApplicationResponse(ResponseCodes.SUCCESS, "Income has been added successfully.");
	}

	/**
	 * This method returns JSOn with all income information from the database.
	 * @return JSON with all income information.
	 */
	@GetMapping(path="/income")
	public @ResponseBody Iterable<Income> viewAllIncome() {
		return this.incomeService.viewAllIncome();
	}
	
	/**
	 * This method is used to return specific customer income information.
	 * @param id ID of customer whose income will be returned.
	 * @return JSON with all specified customer income information.
	 */
	@GetMapping(path = "/customerIncome")
	public @ResponseBody Iterable<Income> viewIncomeByCustomer(@RequestParam long id) {
		return this.incomeService.viewIncomeByCustomer(id);
	}
	
	/**
	 * This method is used to return specific company income information.
	 * @param id ID of company whose income information will be returned.
	 * @return JSON with all specified company income information.
	 */
	@GetMapping(path = "/companyIncome")
	public @ResponseBody Iterable<Income> viewIncomeByCompany(@RequestParam long id) {
		return this.incomeService.viewIncomeByCompany(id);
	}
}
