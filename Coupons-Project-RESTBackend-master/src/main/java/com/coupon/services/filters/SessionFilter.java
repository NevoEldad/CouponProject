package com.coupon.services.filters;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import com.coupon.annotations.SessionFilterAnnotation;
import com.coupon.enums.ServiceNames;
import com.coupons.facades.AdminFacade;
import com.coupons.facades.CompanyFacade;
import com.coupons.facades.CustomerFacade;

/**
 * This filter is used to check if client can use services.
 * If client is not logged in he can't use any service.
 * If client is logged in that it checks if he has the required facade on his session
 * @author Eldad, Tal, Julian
 *
 */
@Provider
@SessionFilterAnnotation
public class SessionFilter implements ContainerRequestFilter{

	@Context private HttpServletRequest httpRequest;
	
	@Override
	public void filter(ContainerRequestContext req) throws IOException {
		HttpSession session = httpRequest.getSession();
		String path = req.getUriInfo().getPath();
		
		if(path.contains(ServiceNames.ADMIN_SERVICE)) {
			if(!(session.getAttribute("facade") instanceof AdminFacade)) {
				req.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity("You must log in as admin to use admin workbench.")
                        .type(MediaType.APPLICATION_JSON).build());
			}
		} else if(path.contains(ServiceNames.COMPANY_SERVICE)) {
			if(!(session.getAttribute("facade") instanceof CompanyFacade)) {
				req.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity("You must log in as company to use company workbench.")
                        .type(MediaType.APPLICATION_JSON).build());
			}
		} else if(path.contains(ServiceNames.CUSTOMER_SERVICE)) {
			if(!(session.getAttribute("facade") instanceof CustomerFacade)) {
				req.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity("You must log in as customer to use customer workbench.")
                        .type(MediaType.APPLICATION_JSON).build());
			}
		} else {
			req.abortWith(Response.status(Response.Status.UNAUTHORIZED).entity("You must log in to use any kind of workbench.")
                    .type(MediaType.APPLICATION_JSON).build());
		}
	}

}
