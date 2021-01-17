package com.coupon.business_delegate;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

import com.coupons.facades.UserType;

/**
 * Business delegate is a singleton class that is used to send income
 * information to the Spring micro-service that stores it in database
 * 
 * @author Eldad, Tal, Julian
 *
 */
public class BusinessDelegate {

	private static BusinessDelegate businessDelegate;

	private BusinessDelegate() {
	}

	public static BusinessDelegate getInstance() {
		if (businessDelegate == null)
			businessDelegate = new BusinessDelegate();
		return businessDelegate;
	}

	/**
	 * This method is used to send income information to the spring micro-service
	 * 
	 * @param userType
	 *            Type of user whose income will be stored
	 * @param userID
	 *            ID of user whose income will be stored
	 * @param userName
	 *            UserName of user whose income will be stored
	 * @param description
	 *            Type of income that will be stored
	 * @param amount
	 *            Amount of money that is relevant to the current income information
	 */
	public synchronized void storeIncome(UserType userType, long userID, String userName, String description,
			double amount) {
		HttpURLConnection con = null;
		try {
			URL url = new URL("http://localhost:8888/IncomeService/income");
			con = (HttpURLConnection) url.openConnection();
			con.setRequestMethod("POST");
			con.setDoOutput(true);
			String json = "{\"id\":\"0\"," + "\"name\":\"" + userName + "\"," + "\"description\":\"" + description
					+ "\"," + "\"userType\":\"" + userType + "\"," + "\"userID\":\"" + userID + "\"," + "\"amount\":\""
					+ amount + "\"}";
			byte[] out = json.getBytes(StandardCharsets.UTF_8);
			int length = out.length;

			con.setFixedLengthStreamingMode(length);
			con.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
			con.connect();
			OutputStream os = con.getOutputStream();
			os.write(out);
			os.close();
			// InputStream in = con.getInputStream();
			// String encoding = con.getContentEncoding();
			// encoding = encoding == null ? "UTF-8" : encoding;
			// Scanner s = new Scanner(in).useDelimiter("\\A");
			// String result = s.hasNext() ? s.next() : "";
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
	}

	/**
	 * This method is used to request all income information from the server
	 * 
	 * @return JSON with all income information
	 */
	public synchronized String viewAllIncome() throws IOException {
		URL url;
		url = new URL("http://localhost:8888/IncomeService/income");
		return sendGetRequest(url);

	}

	/**
	 * This method is used to return specific company income information
	 * 
	 * @param companyID
	 *            ID of company whose income information will be returned
	 * @return JSON with income information of the specific company
	 */
	public synchronized String viewIncomeByCompany(long companyID) throws IOException {
		URL url;
		url = new URL("http://localhost:8888/IncomeService/companyIncome?id=" + companyID);
		return sendGetRequest(url);

	}

	/**
	 * This method is used to return specific customer income information
	 * 
	 * @param customerID
	 *            ID of customer whose income information will be returned
	 * @return JSON with income information of the specific customer
	 */
	public synchronized String viewIncomeByCustomer(long customerID) throws IOException {
		URL url;
		url = new URL("http://localhost:8888/IncomeService/customerIncome?id=" + customerID);
		return sendGetRequest(url);
	}

	/**
	 * This method is a util method, which used to send GET requests to the server
	 * 
	 * @param url
	 *            URL to which the GET request will be sent
	 * @return JSON with the response from the URL
	 */
	private String sendGetRequest(URL url) throws IOException {
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestMethod("GET");
		con.connect();
		InputStream in = con.getInputStream();
		String encoding = con.getContentEncoding();
		encoding = encoding == null ? "UTF-8" : encoding;
		Scanner s = new Scanner(in).useDelimiter("\\A");
		String result = s.hasNext() ? s.next() : "";
		return result;

	}
}
