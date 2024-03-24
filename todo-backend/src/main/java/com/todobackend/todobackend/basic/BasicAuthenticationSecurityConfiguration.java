package com.todobackend.todobackend.basic;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

//@Configuration
public class BasicAuthenticationSecurityConfiguration {
		
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		http.authorizeHttpRequests(
		auth -> {
			auth
			.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll()
			.anyRequest().authenticated();
		});
		
		http.httpBasic(Customizer.withDefaults());
		
		//stateless rst api
		http.sessionManagement(session-> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		
		//disabling csrf
		
		http.csrf().disable();
		return http.build();	
	}

}
