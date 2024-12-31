package com.movie.theater.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class LoginBody {
	@NotNull(message = "Email cannot be empty")
	@Email(message = "Email should be valid")
	private String email;
	
	@NotNull(message = "Password cannot be empty")
	@Size(min = 6, message = "Password must be at least 6 characters long")
	private String password;
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
}
