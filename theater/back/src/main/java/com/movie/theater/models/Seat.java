package com.movie.theater.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "seats")
public class Seat {
	
	@Id
	private String id;
	
	@JsonProperty("hall_id")
	private String hallId;
	
	@JsonProperty("row_number")
	private Integer rowNumber;
	
	@JsonProperty("col_number")
	private Integer colNumber;
	
	private String code;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getHallId() {
		return hallId;
	}
	
	public void setHallId(String hallId) {
		this.hallId = hallId;
	}
	
	public Integer getRowNumber() {
		return rowNumber;
	}
	
	public void setRowNumber(Integer rowNumber) {
		this.rowNumber = rowNumber;
	}
	
	public Integer getColNumber() {
		return colNumber;
	}
	
	public void setColNumber(Integer colNumber) {
		this.colNumber = colNumber;
	}
	
	public String getCode() {
		return code;
	}
	
	public void setCode(String code) {
		this.code = code;
	}
}