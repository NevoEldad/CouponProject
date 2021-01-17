package com.coupon.services;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.coupon.annotations.LoginFilterAnnotation;
import com.coupon.annotations.SessionFilterAnnotation;
import com.coupon.business_delegate.BusinessDelegate;
import com.coupon.classes.LoginInfo;
import com.coupon.enums.ServiceNames;
import com.coupon.errors.ApplicationResponse;
import com.coupon.errors.ResponseCodes;
import com.coupons.classes.Company;
import com.coupons.classes.Customer;
import com.coupons.couponSystem.CouponSystem;
import com.coupons.exceptions.AdminIsNotLoggedIn;
import com.coupons.exceptions.CompanyAlreadyExists;
import com.coupons.exceptions.CompanyDoesNotExist;
import com.coupons.exceptions.ConnectionException;
import com.coupons.exceptions.CustomerAlreadyExists;
import com.coupons.exceptions.CustomerDoesNotExist;
import com.coupons.exceptions.DataBaseException;
import com.coupons.facades.AdminFacade;
import com.coupons.facades.UserType;

/**
 * This service is used to give functions to the administrator.
 * It is used as administrator workbench.
 * @author Eldad, Tal, Julian
 *
 */
@Path(ServiceNames.ADMIN_SERVICE)
public class AdminService {
	
	@Context private HttpServletRequest httpRequest;
	
	
	/**
	 * This method is used to login as administrator into the system.
	 * @param data Login information that is going to be used to log into the system.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.
	 */
	@POST
	@Path(ServiceNames.LOGIN)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@LoginFilterAnnotation
	public Object login(LoginInfo data) {
		try {
			if(data == null)
				return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), "You must provide login information.");
			AdminFacade admin = (AdminFacade) CouponSystem.getInstance().login(data.getUsername(), data.getPassword(), UserType.ADMIN);
			if(admin != null) {		
				httpRequest.getSession().setAttribute("facade", admin);
				return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Login has been successfull.");
			}
			return new ApplicationResponse(ResponseCodes.BAD_LOGIN_INFO.getErrorCode(), "Login information you have provided is incorrect.");
		} catch (ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	
	/**
	 * This method is used to either return all Companies or specific Company from database.
	 * @param id ID of Company that is going to be returned from the database. 
	 * If no ID is sent then the method will return all Companies.
	 * @return Either return Collection of Companies, single Company object or error as JSON.
	 */
	@GET
	@Path(ServiceNames.COMPANY)
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object getCompanies(@QueryParam("id") String id) {
		AdminFacade admin = (AdminFacade) httpRequest.getSession().getAttribute("facade");
		try {
			if(id == null || id.equals("") || id.equals("all")) {
					return admin.getAllCompanies();
			} else if(id.matches(".*\\d+.*")) {				
					return admin.getCompanyByID(Long.parseLong(id));				
			} else 
				return new ApplicationResponse(ResponseCodes.OTHER_ERROR.getErrorCode(), "ID must be number, 'all' or empty.");
		} catch (NumberFormatException | AdminIsNotLoggedIn | CompanyDoesNotExist | ConnectionException
				| DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	
	/**
	 * This method is used to add new Company to the database.
	 * @param company Company that is going to be added to the database.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.
	 */
	@POST
	@Path(ServiceNames.COMPANY)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object createCompany(Company company) {
		AdminFacade admin = (AdminFacade) httpRequest.getSession().getAttribute("facade");
		try {
			admin.createCompany(company);
			return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Company has been added successfully.");
		} catch (AdminIsNotLoggedIn | CompanyAlreadyExists | ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
		
	}
	
	/**
	 * Updates specified Company inside the database.
	 * @param company Company whose information is going to be updated in database.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.
	 */
	@PUT
	@Path(ServiceNames.COMPANY)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object updateCompany(Company company) {
		AdminFacade admin = (AdminFacade) httpRequest.getSession().getAttribute("facade");
		try {
			admin.updateCompany(company);
			return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Company has been updated successfully.");
		} catch (AdminIsNotLoggedIn | CompanyDoesNotExist | ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	/**
	 * Removes Company with specified ID from the database.
	 * @param id ID of Company that is going to be removed from the database.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.
	 */
	@DELETE
	@Path(ServiceNames.COMPANY + "/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object removeCompany(@PathParam("id") String id) {
		AdminFacade admin = (AdminFacade) httpRequest.getSession().getAttribute("facade");
		if(id != null && id.matches(".*\\d+.*")) {
			try {
				admin.removeCompany(Long.parseLong(id));
				return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Company has been removed successfully.");
			} catch (NumberFormatException | AdminIsNotLoggedIn | CompanyDoesNotExist | ConnectionException
					| DataBaseException e) {
				return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
			}
		} else {
			return new ApplicationResponse(ResponseCodes.OTHER_ERROR.getErrorCode(), "ID must be number.");
		}
	}
	
	
	/**
	 * This method is used to either return all Customers or specific Customer from database.
	 * @param id ID of Customer that is going to be returned from the database. 
	 * If no ID is sent then the method will return all Customers.
	 * @return Either return Collection of Customers, single Customer object or error as JSON.
	 */
	@GET
	@Path(ServiceNames.CUSTOMER)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object getCustomers(@QueryParam("id") String id) {
		AdminFacade admin = (AdminFacade) httpRequest.getSession().getAttribute("facade");
		try {
			if(id == null || id.equals("") || id.equals("all")) {
					return admin.getAllCustomers();
			} else if(id.matches(".*\\d+.*")) {				
					return admin.getCustomerByID(Long.parseLong(id));			
			} else 
				return new ApplicationResponse(ResponseCodes.OTHER_ERROR.getErrorCode(), "ID must be number, 'all' or empty.");
		} catch (NumberFormatException | AdminIsNotLoggedIn | CustomerDoesNotExist | ConnectionException
				| DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	/**
	 * This method is used to create new Customer inside the database.
	 * @param customer Customer that is going to be added to the database.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.
	 */
	@POST
	@Path(ServiceNames.CUSTOMER)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object createCustomer(Customer customer) {
		AdminFacade admin = (AdminFacade) httpRequest.getSession().getAttribute("facade");
		try {
			admin.createCustomer(customer);
			return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Customer has been added successfully.");
		} catch (AdminIsNotLoggedIn | CustomerAlreadyExists | ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}		
	}
	
	/**
	 * This method is used to update specific Customer inside the database.
	 * @param customer Customer that is going to be updated inside the database.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.
	 */
	@PUT
	@Path(ServiceNames.CUSTOMER)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object updateCustomer(Customer customer) {
		AdminFacade admin = (AdminFacade) httpRequest.getSession().getAttribute("facade");
		try {
			admin.updateCustomer(customer);
			return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Customer has been updated successfully.");
		} catch (AdminIsNotLoggedIn | CustomerDoesNotExist | ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	/**
	 * This method is used to remove Customer with specified ID from the database. 
	 * @param id ID of Customer that is going to be removed from the database.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.
	 */
	@DELETE
	@Path(ServiceNames.CUSTOMER + "/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object removeCustomer(@PathParam("id") String id) {
		AdminFacade admin = (AdminFacade) httpRequest.getSession().getAttribute("facade");
		if(id != null && id.matches(".*\\d+.*")) {
			try {
				admin.removeCustomer(Long.parseLong(id));
				return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Customer has been removed successfully.");
			} catch (NumberFormatException | AdminIsNotLoggedIn | CustomerDoesNotExist | ConnectionException
					| DataBaseException e) {
				return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
			}
		} else {
			return new ApplicationResponse(ResponseCodes.OTHER_ERROR.getErrorCode(), "ID must be number.");
		}
	}
	
	/**
	 * This method is used to send all income information.
	 * @return Either returns all income information as JSON object or ApplicationResponse with 
	 * the error message.
	 */
	@GET
	@Path(ServiceNames.INCOME)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object viewAllIncome() {
		try {
			return BusinessDelegate.getInstance().viewAllIncome();
		} catch (IOException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	/**
	 * This method is used to send all income information of specific company.
	 * @param id ID of company whose income information will be returned
	 * @return  Either returns all income information of specified company as JSON object 
	 * or ApplicationResponse with the error message.
	 */
	@GET
	@Path(ServiceNames.INCOME + "company")
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object viewIncomeByCompany(@QueryParam("id") long id) {
		try {
			return BusinessDelegate.getInstance().viewIncomeByCompany(id);
		} catch (IOException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	/**
	 * This method is used to send all income information of specific customer.
	 * @param id ID of customer whose income information will be returned.
	 * @return Either returns all income information of specified customer as JSON object
	 * or ApplicationResponse with the error message.
	 */
	@GET
	@Path(ServiceNames.INCOME + "customer")
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object viewIncomeByCustomer(@QueryParam("id") long id) {
		try {
			return BusinessDelegate.getInstance().viewIncomeByCustomer(id);
		} catch (IOException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
}
