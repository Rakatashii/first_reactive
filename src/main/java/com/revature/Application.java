package com.revature;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import com.revature.reactive.CreateMeths;

import io.reactivex.Observable;

@SpringBootApplication(/*exclude = { SecurityAutoConfiguration.class }*/)
public class Application  extends SpringBootServletInitializer {

	public static void main(String[] args) {
		AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
		context.register(WebMvcConfig.class);
		
		CreateMeths.init();
		Observable<String> filtered = (Observable<String>) CreateMeths.filter(s -> s.length() > 5);
		filtered.subscribe(s -> System.out.println(s));
		
		SpringApplication.run(Application.class, args);
		context.close();
	}
}
