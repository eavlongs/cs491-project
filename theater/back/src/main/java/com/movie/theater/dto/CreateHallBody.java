package com.movie.theater.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.validation.constraints.*;

public class CreateHallBody {
	@NotNull(message = "hall_name cannot be empty")
	@Size(min = 1, message = "hall_name cannot be empty")
	@Size(max = 100, message = "hall_name cannot be longer than 100 characters")
	@JsonProperty("hall_name")
	private String hallName;
	
	@NotNull(message = "seat_price cannot be empty")
	@Min(value = 0, message = "seat_price cannot be less than 0")
	@Max(value = 1000, message = "seat_price cannot be greater than 1000")
	@JsonProperty("seat_price")
	private double seatPrice;
	
	public @NotNull(message = "hall_name cannot be empty") @Size(min = 1, message = "hall_name cannot be empty") @Size(max = 100, message = "hall_name cannot be longer than 100 characters") String getHallName() {
		return hallName;
	}
	
	public void setHallName(@NotNull(message = "hall_name cannot be empty") @Size(min = 1, message = "hall_name cannot be empty") @Size(max = 100, message = "hall_name cannot be longer than 100 characters") String hallName) {
		this.hallName = hallName;
	}
	
	@NotNull(message = "seat_price cannot be empty")
	@Min(value = 0, message = "seat_price cannot be less than 0")
	@Max(value = 1000, message = "seat_price cannot be greater than 1000")
	public double getSeatPrice() {
		return seatPrice;
	}
	
	public void setSeatPrice(@NotNull(message = "seat_price cannot be empty") @Min(value = 0, message = "seat_price cannot be less than 0") @Max(value = 1000, message = "seat_price cannot be greater than 1000") double seatPrice) {
		this.seatPrice = seatPrice;
	}
}
