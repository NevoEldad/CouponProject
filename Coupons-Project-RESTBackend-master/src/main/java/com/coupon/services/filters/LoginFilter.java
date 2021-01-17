package com.coupon.services.filters;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;

import com.coupon.annotations.LoginFilterAnnotation;
import com.coupon.errors.ApplicationResponse;
import com.coupon.errors.ResponseCodes;
import com.coupons.facades.CouponClientFacade;



/**
 * This filter is used to filter incoming login or logout calls.
 * If user already logged in then he can't login again.
 * If user already logged out then he can't logout again.
 * @author Eldad, Tal, Julian
 *
 */
@Provider
@LoginFilterAnnotation
public class LoginFilter implements ContainerRequestFilter{

	@Context HttpServletRequest httpRequest;
	@Context SecurityContext context;
	/**
	 * This filter basically filters all incoming login and logout calls.
	 */
	@Override
	public void filter(ContainerRequestContext req) throws IOException {	
		HttpSession session = httpRequest.getSession();
		CouponClientFacade facade = (CouponClientFacade) session.getAttribute("facade");
		String path = req.getUriInfo().getPath();

		if(path.contains("login"))
			if (facade != null)
				req.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity(new ApplicationResponse(ResponseCodes.OTHER_ERROR.getErrorCode(), "You have already logged in."))
	                    .type(MediaType.APPLICATION_JSON).build());
		else if(path.contains("logout")) 
				if(facade == null)
					req.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity(new ApplicationResponse(ResponseCodes.OTHER_ERROR.getErrorCode(), "You must log in before you log out."))
		                    .type(MediaType.APPLICATION_JSON).build());
		
	}

}
