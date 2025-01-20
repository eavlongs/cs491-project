package com.movie.theater.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "movies")
public class Movie {
	@Id
	private String id;
	@JsonProperty("mb_id")
	private String mbId;
	private String genres;
	@JsonProperty("age_restriction")
	private String ageRestriction;
	private String title;
	private String description;
	@JsonProperty("poster_url")
	private String posterUrl;
	private String directors;
	private String cast;
	@JsonProperty("release_date")
	private Date releaseDate;
	@JsonProperty("movie_duration")
	private int movieDuration;
	@JsonProperty("trailer_url")
	private String trailerUrl;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getmbId() {
		return mbId;
	}
	
	public void setmbId(String mbId) {
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
	
	public String getDirectors() {
		return directors;
	}
	
	public void setDirectors(String directors) {
		this.directors = directors;
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
