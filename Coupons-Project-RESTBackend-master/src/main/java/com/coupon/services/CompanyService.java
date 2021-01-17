package com.coupon.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

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
import com.coupons.classes.Coupon;
import com.coupons.classes.CouponType;
import com.coupons.couponSystem.CouponSystem;
import com.coupons.exceptions.CompanyAlreadyOwnsCoupon;
import com.coupons.exceptions.CompanyDoesNotOwnCoupon;
import com.coupons.exceptions.CompanyIsNotLoggedIn;
import com.coupons.exceptions.ConnectionException;
import com.coupons.exceptions.CouponAlreadyExists;
import com.coupons.exceptions.CouponDoesNotExist;
import com.coupons.exceptions.DataBaseException;
import com.coupons.facades.CompanyFacade;
import com.coupons.facades.UserType;

/**
 * This service is used to give functions to the company user.
 * It is used as company user workbench.
 * @author Eldad, Tal, Julian
 *
 */
@Path(ServiceNames.COMPANY_SERVICE)
public class CompanyService {

	@Context private HttpServletRequest httpRequest;
	
	/**
	 * This method is used to login as Company into the system.
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
			CompanyFacade company = (CompanyFacade) CouponSystem.getInstance().login(data.getUsername(), data.getPassword(), UserType.COMPANY);
			if(company != null) {		
				httpRequest.getSession().setAttribute("facade", company);
				return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Login has been successfull.");
			}
			return new ApplicationResponse(ResponseCodes.BAD_LOGIN_INFO.getErrorCode(), "Login information you have provided is incorrect.");
		} catch (ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	/**
	 * This method is used to either return all Coupons, Coupons by type or Coupon with specific ID.
	 * If no ID or Type will be sent then method will return all Coupons from the database.
	 * @param id ID of Coupon that is going to be returned from the database. 
	 * @param type Type of Coupons that are going to be returned from the database.
	 * @param date Date of Coupons up to which coupons are going to be returned from the database.
	 * @param price price of Coupons up to which coupons are going to be returned from the database.
	 * @return Either return Collection of Coupons, single Coupon object or error as JSON.
	 */
	@GET
	@Path(ServiceNames.COUPON)
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object getCoupons(@QueryParam("id") String id, @QueryParam("type") String type, @QueryParam("time") String date, @QueryParam("price") String price) {
		CompanyFacade company = (CompanyFacade) httpRequest.getSession().getAttribute("facade");			
		try {
			if( (id == null || id.equals("")) && (type == null || type.equals("")) && (date == null || date.equals("")) && (price==null || price.equals(""))) {
					return company.getAllCoupons();
			} else if(id != null && id.matches(".*\\d+.*")) {				
					return company.getCouponByID(Long.parseLong(id));				
			} else if(date != null && date.matches(".*\\d+.*")) {
				return company.getCouponsUntilDate(new Date(Long.parseLong(date)));
			} else if(price != null && !price.equals(""))
				return company.getCouponsUpToPrice(Double.parseDouble(price));
			else
				for (CouponType couponType : CouponType.values()) 
					if(couponType.name().equals(type))
						return company.getCouponByType(couponType);															
			return new ApplicationResponse(ResponseCodes.OTHER_ERROR.getErrorCode(), "ID must be number, 'all' or empty and CouponType must exist.");
		} catch (NumberFormatException | CompanyIsNotLoggedIn | ConnectionException
				| DataBaseException | CompanyDoesNotOwnCoupon e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	/**
	 * This method is used to add new Coupon to the database.
	 * @param coupon Coupon that is going to be added to the database.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.
	 */
	@POST
	@Path(ServiceNames.COUPON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object createCoupon(Coupon coupon) {
		CompanyFacade company = (CompanyFacade) httpRequest.getSession().getAttribute("facade");	
		try {
			company.createCoupon(coupon);
			BusinessDelegate.getInstance().storeIncome(UserType.COMPANY, company.getLoggedCompanyID(), company.getLoggedName(), "COMPANY_NEW_COUPON", 100);
			return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Coupon has been added successfully.");
		} catch (CouponAlreadyExists | CompanyIsNotLoggedIn | CompanyAlreadyOwnsCoupon | ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
		
	}
	
	
	/**
	 * Updates specified Coupon inside the database.
	 * @param coupon Coupon whose information is going to be updated in database.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.
	 */
	@PUT
	@Path(ServiceNames.COUPON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object updateCoupon(Coupon coupon) {
		CompanyFacade company = (CompanyFacade) httpRequest.getSession().getAttribute("facade");	
		try {
			company.updateCoupon(coupon);
			BusinessDelegate.getInstance().storeIncome(UserType.COMPANY, company.getLoggedCompanyID(), company.getLoggedName(), "COMPANY_UPDATE_COUPON", 10);
			return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Coupon has been updated successfully.");
		} catch (CouponDoesNotExist | CompanyIsNotLoggedIn | CompanyDoesNotOwnCoupon | ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	
	/**
	 * Removes Coupon with specified ID from the database.
	 * @param id ID of Coupon that is going to be removed from the database.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.
	 */
	@DELETE
	@Path(ServiceNames.COUPON + "/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object removeCoupon(@PathParam("id") String id) {
		CompanyFacade company = (CompanyFacade) httpRequest.getSession().getAttribute("facade");	
		if(id != null && id.matches(".*\\d+.*")) {
			try {
				company.removeCoupon(Long.parseLong(id));
				return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Coupon has been removed successfully.");
			} catch ( NumberFormatException | CompanyIsNotLoggedIn | CompanyDoesNotOwnCoupon | 
					  CouponDoesNotExist | ConnectionException | DataBaseException e) {
				return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
			}
		} else {
			return new ApplicationResponse(ResponseCodes.OTHER_ERROR.getErrorCode(), "ID must be number.");
		}
	}
	
	/**
	 * This method is used to get Company information.
	 * @return Returns either currently logged in Company information or error.
	 */
	@GET
	@Path(ServiceNames.COMPANY)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object getCompanyInformation() {
		CompanyFacade company = (CompanyFacade) httpRequest.getSession().getAttribute("facade");	
		try {
			long companyID = company.getLoggedCompanyID();		
			String name = company.getLoggedName(), 
				   password = company.getLoggedPassword(), 
				   email = company.getLoggedEmail();
			return new Company(companyID, name, password, email, new ArrayList<Coupon>());
		} catch (CompanyIsNotLoggedIn e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	/**
	 * This method is used to return company income.
	 * @return Returns either company income or error.
	 */
	@GET
	@Path(ServiceNames.INCOME)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object getCompanyIncome() {
		CompanyFacade company = (CompanyFacade) httpRequest.getSession().getAttribute("facade");	
		try {
			return BusinessDelegate.getInstance().viewIncomeByCompany(company.getLoggedCompanyID());
		} catch (IOException | CompanyIsNotLoggedIn e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
}
