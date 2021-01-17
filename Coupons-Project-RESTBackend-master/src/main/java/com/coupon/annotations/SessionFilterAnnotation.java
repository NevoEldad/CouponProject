package com.coupon.annotations;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.ws.rs.NameBinding;
/**
 * This annotation is used to choose what methods are going to go through the session filter.
 * @author Eldad, Tal, Julian
 *
 */
@NameBinding
@Retention(RUNTIME)
@Target({ TYPE, METHOD })
public @interface SessionFilterAnnotation {}
