package com.movie.theater.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "schedules")
public class Schedule {
	private String id;
	
	private String movieId;
	

	private String hallId;
	
	private Date startTime;
	private Date endTime;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getMovieId() {
		return movieId;
	}
	
	public void setMovieId(String movieId) {
		this.movieId = movieId;
	}
	
	public String getHallId() {
		return hallId;
	}
	
	public void setHallId(String hallId) {
		this.hallId = hallId;
	}
	
	public Date getStartTime() {
		return startTime;
	}
	
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	
	public Date getEndTime() {
		return endTime;
	}
	
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
}