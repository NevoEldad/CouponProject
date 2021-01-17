package com.coupon.services;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.coupon.annotations.SessionFilterAnnotation;
import com.coupon.business_delegate.BusinessDelegate;
import com.coupon.classes.LoginInfo;
import com.coupon.enums.ServiceNames;
import com.coupon.errors.ApplicationResponse;
import com.coupon.errors.ResponseCodes;
import com.coupon.utils.Utils;
import com.coupons.classes.Coupon;
import com.coupons.classes.CouponType;
import com.coupons.classes.Customer;
import com.coupons.couponSystem.CouponSystem;
import com.coupons.exceptions.ConnectionException;
import com.coupons.exceptions.CouponDoesNotExist;
import com.coupons.exceptions.CouponOutOfDate;
import com.coupons.exceptions.CouponOutOfStock;
import com.coupons.exceptions.CustomerAlreadyBroughtCoupon;
import com.coupons.exceptions.CustomerIsNotLoggedIn;
import com.coupons.exceptions.DataBaseException;
import com.coupons.facades.CustomerFacade;
import com.coupons.facades.UserType;

/**
 * This service is used to give functions to the customer.
 * It is used as customer workbench.
 * @author Eldad, Tal, Julian
 *
 */
@Path(ServiceNames.CUSTOMER_SERVICE)
public class CustomerService {
	
	@Context private HttpServletRequest httpRequest;	
		
	/**
	 * This method is used to login as Customer into the system.
	 * @param data Login information that is going to be used to log into the system.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.
	 */
	@POST
	@Path(ServiceNames.LOGIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public Object login(LoginInfo data) {
		try {
			if(data == null)
				return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), "You must provide login information.");
			CustomerFacade customer = (CustomerFacade) CouponSystem.getInstance().login(data.getUsername(), data.getPassword(), UserType.CUSTOMER);
			if(customer != null) {		
				httpRequest.getSession().setAttribute("facade", customer);
				return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Login has been successfull.");
			}
			return new ApplicationResponse(ResponseCodes.BAD_LOGIN_INFO.getErrorCode(), "Login information you have provided is incorrect.");
		} catch (ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	
	/**
	 * This method is used to either return all purchased Coupons, Coupons by type or Coupons up to specific price.
	 * If no Price or Type will be sent then method will return all purchased Coupons from the database.
	 * @param price Price up to which Coupons are going to be taken from the database.
	 * @param type Type of Coupons that are going to be returned from the database.
	 * @return Either return Collection of Coupons, single Coupon object or error as JSON.
	 */
	@GET
	@Path(ServiceNames.COUPON)
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object getPurchasedCoupons(@QueryParam("price") String price, @QueryParam("type") String type) {
		CustomerFacade customer = (CustomerFacade) httpRequest.getSession().getAttribute("facade");			
		try {
			if( (price == null || price.equals("")) && (type == null || type.equals(""))) {
					return customer.getAllPurchasedCoupons();
			} else if(Utils.checkIfStringIsDouble(price)) {				
					return customer.getAllPurchasedCouponUpToPrice(Double.parseDouble(price));	
			} else 
				for (CouponType couponType : CouponType.values()) 
					if(couponType.name().equals(type)) 
						return customer.getAllPurchasedCouponsByType(couponType);													
			return new ApplicationResponse(ResponseCodes.OTHER_ERROR.getErrorCode(), "Price must be a number and CouponType must exist.");			
		} catch (CustomerIsNotLoggedIn | ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
	/**
	 * This method is used to purchase coupon.
	 * @param coupon Coupon that is going to be purchased.
	 * @return Returns status of the action that has been performed with a message. 
	 * If it succeeds it returns success code and if fails returns error.	
	 */
	@POST
	@Path(ServiceNames.COUPON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object purchaseCoupon(Coupon coupon) {
		CustomerFacade customer = (CustomerFacade) httpRequest.getSession().getAttribute("facade");			
		try {
			customer.purchaseCoupon(coupon.getId());
			BusinessDelegate.getInstance().storeIncome(UserType.CUSTOMER, customer.getLoggedInCustomerID(), customer.getName(), "CUSTOMER_PURCHASE", coupon.getPrice());
			return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Coupon has been purchased successfully.");
		} catch (CustomerIsNotLoggedIn | CouponDoesNotExist | CouponOutOfStock | 
				 CouponOutOfDate | CustomerAlreadyBroughtCoupon | ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
		
	}
	
	@GET
	@Path(ServiceNames.CUSTOMER)
	@Produces(MediaType.APPLICATION_JSON)
	@SessionFilterAnnotation
	public Object getCustomerInfo() {
		CustomerFacade customer = (CustomerFacade) httpRequest.getSession().getAttribute("facade");		
		try {
			return new Customer(customer.getLoggedInCustomerID(), customer.getName(), customer.getPassword());
		} catch (CustomerIsNotLoggedIn e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
	
}
