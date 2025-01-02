package com.movie.theater.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "movies")
public class Movie {
	@Id
	private String id;
	private Integer mbId;
	private String genres;
	private String ageRestriction;
	private String title;
	private String description;
	private String posterUrl;
	private String director;
	private String writers;
	private String cast;
	private Date releaseDate;
	private int movieDuration;
	private String trailerUrl;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public Integer getmbId() {
		return mbId;
	}
	
	public void setmbId(Integer mbId) {
		this.mbId = mbId;
	}
	
	public String getGenres() {
		return genres;
	}
	
	public void setGenres(String genres) {
		this.genres = genres;
	}
	
	public String getAgeRestriction() {
		return ageRestriction;
	}
	
	public void setAgeRestriction(String ageRestriction) {
		this.ageRestriction = ageRestriction;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getPosterUrl() {
		return posterUrl;
	}
	
	public void setPosterUrl(String posterUrl) {
		this.posterUrl = posterUrl;
	}
	
	public String getDirector() {
		return director;
	}
	
	public void setDirector(String director) {
		this.director = director;
	}
	
	public String getWriters() {
		return writers;
	}
	
	public void setWriters(String writers) {
		this.writers = writers;
	}
	
	public String getCast() {
		return cast;
	}
	
	public void setCast(String cast) {
		this.cast = cast;
	}
	
	public Date getReleaseDate() {
		return releaseDate;
	}
	
	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}
	
	public int getMovieDuration() {
		return movieDuration;
	}
	
	public void setMovieDuration(int movieDuration) {
		this.movieDuration = movieDuration;
	}
	
	public String getTrailerUrl() {
		return trailerUrl;
	}
	
	public void setTrailerUrl(String trailerUrl) {
		this.trailerUrl = trailerUrl;
	}
}
