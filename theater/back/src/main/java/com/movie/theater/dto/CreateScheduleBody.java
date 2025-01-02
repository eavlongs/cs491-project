package com.movie.theater.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.Date;

public class CreateScheduleBody {
	@JsonProperty("movie_id")
	@NotBlank(message = "movie_id is required")
	private String movieId;
	
	@JsonProperty("hall_id")
	@NotBlank(message = "hall_id is required")
	private String hallId;
	
	@JsonProperty("start_time")
	@NotEmpty(message = "start_time is required")
	@Future(message = "start_time must be in the future")
	private Date startTime;
	
	public @NotBlank(message = "movie_id is required") String getMovieId() {
		return movieId;
	}
	
	public void setMovieId(@NotBlank(message = "movie_id is required") String movieId) {
		this.movieId = movieId;
	}
	
	public @NotBlank(message = "hall_id is required") String getHallId() {
		return hallId;
	}
	
	public void setHallId(@NotBlank(message = "hall_id is required") String hallId) {
		this.hallId = hallId;
	}
	
	public @NotEmpty(message = "start_time is required") @Future(message = "start_time must be in the future") Date getStartTime() {
		return startTime;
	}
	
	public void setStartTime(@NotEmpty(message = "start_time is required") @Future(message = "start_time must be in the future") Date startTime) {
		this.startTime = startTime;
	}
}
