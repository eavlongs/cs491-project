package com.movie.theater.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

import java.util.Date;

public class CreateMovieBody {
	@JsonProperty("mb_id")
	private String mbId;

	@Size(max = 255, message = "Genres cannot exceed 255 characters")
	private String genres;

	@JsonProperty("age_restriction")
	@NotBlank(message = "Age restriction cannot be blank")
	@Size(max = 10, message = "Age restriction cannot exceed 10 characters")
	private String ageRestriction;

	@NotBlank(message = "Title cannot be blank")
	@Size(max = 255, message = "Title cannot exceed 255 characters")
	private String title;

	private String description;

	@JsonProperty("poster_url")
	@NotBlank(message = "Poster URL cannot be blank")
	@Size(max = 512, message = "Poster URL cannot exceed 512 characters")
	private String posterUrl;

	@NotBlank(message = "Directors cannot be blank")
	@Size(max = 512, message = "Directors cannot exceed 512 characters")
	private String directors;

	@NotBlank(message = "Writers cannot be blank")
	@Size(max = 512, message = "Writers cannot exceed 512 characters")
	private String writers;

	@NotBlank(message = "Cast cannot be blank")
	@Size(max = 512, message = "Cast cannot exceed 512 characters")
	private String cast;

	@JsonProperty("release_date")
	private Date releaseDate;

	@JsonProperty("movie_duration")
	@Min(value = 1, message = "Movie duration must be greater than 0")
	@Max(value = 1000, message = "Movie duration must be less than 1000")
	private int movieDuration;

	@JsonProperty("trailer_url")
	@Size(max = 512, message = "Trailer URL cannot exceed 512 characters")
	private String trailerUrl;

	public String getMbId() {
		return mbId;
	}

	public void setMbId(String mbId) {
		this.mbId = mbId;
	}

	public @Size(max = 255, message = "Genres cannot exceed 255 characters") String getGenres() {
		return genres;
	}

	public void setGenres(@Size(max = 255, message = "Genres cannot exceed 255 characters") String genres) {
		this.genres = genres;
	}

	public @NotBlank(message = "Age restriction cannot be blank") @Size(max = 10, message = "Age restriction cannot exceed 10 characters") String getAgeRestriction() {
		return ageRestriction;
	}

	public void setAgeRestriction(@NotBlank(message = "Age restriction cannot be blank") @Size(max = 10, message = "Age restriction cannot exceed 10 characters") String ageRestriction) {
		this.ageRestriction = ageRestriction;
	}

	public @NotBlank(message = "Title cannot be blank") @Size(max = 255, message = "Title cannot exceed 255 characters") String getTitle() {
		return title;
	}

	public void setTitle(@NotBlank(message = "Title cannot be blank") @Size(max = 255, message = "Title cannot exceed 255 characters") String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public @NotBlank(message = "Poster URL cannot be blank") @Size(max = 512, message = "Poster URL cannot exceed 512 characters") String getPosterUrl() {
		return posterUrl;
	}

	public void setPosterUrl(@NotBlank(message = "Poster URL cannot be blank") @Size(max = 512, message = "Poster URL cannot exceed 512 characters") String posterUrl) {
		this.posterUrl = posterUrl;
	}

	public @NotBlank(message = "Directors cannot be blank") @Size(max = 512, message = "Directors cannot exceed 512 characters") String getDirectors() {
		return directors;
	}

	public void setDirectors(@NotBlank(message = "Directors cannot be blank") @Size(max = 512, message = "Directors cannot exceed 512 characters") String director) {
		this.directors = director;
	}

	public @NotBlank(message = "Writers cannot be blank") @Size(max = 512, message = "Writers cannot exceed 512 characters") String getWriters() {
		return writers;
	}

	public void setWriters(@NotBlank(message = "Writers cannot be blank") @Size(max = 512, message = "Writers cannot exceed 512 characters") String writers) {
		this.writers = writers;
	}

	public @NotBlank(message = "Cast cannot be blank") @Size(max = 512, message = "Cast cannot exceed 512 characters") String getCast() {
		return cast;
	}

	public void setCast(@NotBlank(message = "Cast cannot be blank") @Size(max = 512, message = "Cast cannot exceed 512 characters") String cast) {
		this.cast = cast;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	@Min(value = 1, message = "Movie duration must be greater than 0")
	@Max(value = 1000, message = "Movie duration must be less than 1000")
	public int getMovieDuration() {
		return movieDuration;
	}

	public void setMovieDuration(@Min(value = 1, message = "Movie duration must be greater than 0") @Max(value = 1000, message = "Movie duration must be less than 1000") int movieDuration) {
		this.movieDuration = movieDuration;
	}

	public @Size(max = 512, message = "Trailer URL cannot exceed 512 characters") String getTrailerUrl() {
		return trailerUrl;
	}

	public void setTrailerUrl(@Size(max = 512, message = "Trailer URL cannot exceed 512 characters") String trailerUrl) {
		this.trailerUrl = trailerUrl;
	}
}
