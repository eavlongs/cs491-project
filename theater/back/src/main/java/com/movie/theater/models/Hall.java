package com.movie.theater.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "halls")
public class Hall {
	
	@Id
	private String id;
	
	private String name;
	private Double seatPrice;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Double getSeatPrice() {
		return seatPrice;
	}
	
	public void setSeatPrice(Double seatPrice) {
		this.seatPrice = seatPrice;
	}
}