package com.movie.theater.models;

import java.util.Date;

public class Ticket {
	private String id;
	private String scheduleId;
	private String seatId;
	private Date createdAt;
	private Double price;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getScheduleId() {
		return scheduleId;
	}
	
	public void setScheduleId(String scheduleId) {
		this.scheduleId = scheduleId;
	}
	
	public String getSeatId() {
		return seatId;
	}
	
	public void setSeatId(String seatId) {
		this.seatId = seatId;
	}
	
	public Date getCreatedAt() {
		return createdAt;
	}
	
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	public Double getPrice() {
		return price;
	}
	
	public void setPrice(Double price) {
		this.price = price;
	}
}
