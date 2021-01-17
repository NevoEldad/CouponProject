package com.coupon.utils;

/**
 * This class is used as utilities for the server side.
 * @author Eldad, Tal, Julian
 *
 */
public class Utils {

	/**
	 * This method is used to check whether String is a Double.
	 * @param number String that is going to be checked.
	 * @return Returns true if String is a Double and false if not.
	 */
	public static boolean checkIfStringIsDouble(String number) {
		    if (number == null) {
		        return false;
		    }
		    int length = number.length();
		    if (length == 0) {
		        return false;
		    }
		    int i = 0;
		    if (number.charAt(0) == '-') {
		        if (length == 1) {
		            return false;
		        }
		        ++i;
		    }
		    int integerPartSize = 0;
		    int exponentPartSize = -1;
		    while (i < length) {
		        char c = number.charAt(i);
		        if (c < '0' || c > '9') {
		            if (c == '.' && integerPartSize > 0 && exponentPartSize == -1) {
		                exponentPartSize = 0;
		            } else {
		                return false;
		            }
		        } else if (exponentPartSize > -1) {
		            ++exponentPartSize;
		        } else {
		            ++integerPartSize;
		        }
		        ++i;
		    }
		    if ((number.charAt(0) == '0' && i > 1 && exponentPartSize < 1)
		            || exponentPartSize == 0 || (number.charAt(length - 1) == '.')) {
		        return false;
		    }
		    return true;
	}
	
}
