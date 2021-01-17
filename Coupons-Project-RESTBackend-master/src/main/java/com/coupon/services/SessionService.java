package com.coupon.services;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;

import com.coupon.errors.ApplicationResponse;
import com.coupon.errors.ResponseCodes;
import com.coupons.exceptions.ConnectionException;
import com.coupons.exceptions.DataBaseException;
import com.coupons.facades.AdminFacade;
import com.coupons.facades.CouponAPI;
import com.coupons.facades.CustomerFacade;
import com.coupons.facades.UserType;

/**
 * This service is used to give session functions to the client side. It can
 * invalidate sessions and check if user is logged in.
 * 
 * @author Eldad, Tal, Julian
 *
 */
@Path("SessionService")
public class SessionService {

	@Context
	private HttpServletRequest httpRequest;

	@GET
	@Path("logout")
	public Object logout() {
		this.httpRequest.getSession().invalidate();
		return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Logged out successfully.");
	}

	/**
	 * This method is used to check whether client has a facade on his session, and
	 * what kind of facade he has.
	 * 
	 * @return userType Type of user that has sent the request.
	 */
	@GET
	@Path("checkSession")
	public Object checkSession() {
		HttpSession session = this.httpRequest.getSession();
		Object facade = session.getAttribute("facade");
		if (facade == null)
			return UserType.GUEST;
		if (facade instanceof AdminFacade)
			return UserType.ADMIN;
		if (facade instanceof CustomerFacade)
			return UserType.CUSTOMER;
		return UserType.COMPANY;

	}

	/**
	 * This method is used to get all the shop information from the database.
	 * 
	 * @return ArrayList of coupons from the database.
	 */
	@GET
	@Path("shop")
	public Object getShop() {
		try {
			return new CouponAPI().loadCouponsFromTheDataBase();
		} catch (ConnectionException | DataBaseException e) {
			return new ApplicationResponse(ResponseCodes.SYSTEM_ERROR.getErrorCode(), e.getMessage());
		}
	}
}
