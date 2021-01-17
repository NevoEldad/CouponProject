package com.coupon.services;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.coupon.classes.ServerInfo;
import com.coupon.enums.ServiceNames;
import com.coupon.errors.ApplicationResponse;
import com.coupon.errors.ResponseCodes;
import com.coupons.exceptions.ConnectionException;
import com.coupons.exceptions.CouldNotWriteToServerInfoFile;
import com.coupons.utils.CreateDatabaseTables;
import com.coupons.utils.ServerInformation;

/**
 * This class is used as the service for configuration of the database connection.
 * It is used to
 * @author Eldad, Tal, Julian
 *
 */
@Path(ServiceNames.SERVER_CONFIG_SERVICE)
public class ServerConfigService {

	@POST
	@Path(ServiceNames.INFO)
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Object changeDataBaseInfo(ServerInfo info) {
		ServerInformation serverInfo = ServerInformation.getServerInfoInstance();
		try {
			serverInfo.setDatabaseName(info.getDbName());
			serverInfo.setUserName(info.getUserName());
			serverInfo.setUserPassword(info.getPassword());
			serverInfo.setPort(info.getPort());
			return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(), "Successfully changed information");
		} catch (CouldNotWriteToServerInfoFile e) {
			return new ApplicationResponse(ResponseCodes.OTHER_ERROR.getErrorCode(), e.getMessage());
		}

	}

	@GET
	@Path(ServiceNames.INFO)
	@Produces(MediaType.APPLICATION_JSON)
	public Object getDataBaseInfo() {
		ServerInfo nfo = new ServerInfo();
		nfo.setDbName(ServerInformation.getServerInfoInstance().getConnectionInformation()[0]);
		nfo.setUserName(ServerInformation.getServerInfoInstance().getConnectionInformation()[1]);
		nfo.setPassword(ServerInformation.getServerInfoInstance().getConnectionInformation()[2]);
		nfo.setPort(ServerInformation.getServerInfoInstance().getConnectionInformation()[3]);
		return nfo;
	}

	@PUT
	@Path(ServiceNames.INFO)
	@Produces(MediaType.APPLICATION_JSON)
	public Object generateTablesInDatabase() {
		try {
			CreateDatabaseTables.createDataBase();
			return new ApplicationResponse(ResponseCodes.SUCCESS.getErrorCode(),
					"The tables were created successfully.");
		} catch (ConnectionException | ClassNotFoundException e) {
			return new ApplicationResponse(ResponseCodes.OTHER_ERROR.getErrorCode(), e.getMessage());
		}
	}
}