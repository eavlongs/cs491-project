package com.movie.theater.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegisterBody {
	@JsonProperty("first_name")
	@NotNull(message = "First name cannot be empty")
	@Size(min = 1, max = 50, message = "First name must be between 1 and 50 characters")
	private String firstName;
	
	@JsonProperty("last_name")
	@NotNull(message = "Last name cannot be empty")
	@Size(min = 1, max = 50, message = "Last name must be between 1 and 50 characters")
	private String lastName;

	@NotNull(message = "Email cannot be empty")
	@Email(message = "Email should be valid")
	private String email;

	@NotNull(message = "Password cannot be empty")
	@Size(min = 6, message = "Password must be at least 6 characters long")
	private String password;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

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