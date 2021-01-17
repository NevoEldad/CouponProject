package com.coupon.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.ws.rs.NameBinding;

/**
 * This annotation is used to choose what methods are going to go through the login filter.
 * @author Eldad, Tal, Julian
 *
 */
@NameBinding
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.TYPE, ElementType.METHOD })
public @interface LoginFilterAnnotation {

}
