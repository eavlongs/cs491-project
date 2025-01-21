package com.movie.theater.controllers;

import com.movie.theater.dto.CreateHallBody;
import com.movie.theater.dto.CreateMovieBody;
import com.movie.theater.dto.CreateScheduleBody;
import com.movie.theater.helper.JWTHelper;
import com.movie.theater.helper.ResponseHelper;
import com.movie.theater.models.*;
import com.movie.theater.repository.MovieRepository;
import com.movie.theater.services.MovieService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

@RestController
@RequestMapping("/api")
public class MovieController {
	@Autowired
	private MovieService movieService;
	@Autowired
	private JWTHelper jwtHelper;
	private MovieRepository movieRepository;
	
	@GetMapping("/halls")
	public ResponseEntity<Map<String, Object>> getHalls(@RequestHeader String Authorization) {
		try {
			jwtHelper.isAdminMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		List<Hall> halls = movieService.getHalls();
		return ResponseHelper.buildSuccessResponse(Map.of("halls", halls));
	}
	
	@PostMapping("/halls")
	public ResponseEntity<Map<String, Object>> createHall(@Valid @RequestBody CreateHallBody body,
	                                                      @RequestHeader String Authorization) {
		try {
			jwtHelper.isAdminMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		Hall hall = new Hall();
		hall.setName(body.getName());
		hall.setSeatPrice(body.getSeatPrice());
		movieService.createHall(hall);
		
		try {
			movieService.createSeatsInHall(hall.getId());
		} catch (Exception e) {
			movieService.deleteHall(hall.getId());
			return ResponseHelper.buildInternalServerErrorResponse();
		}
		
		return ResponseHelper.buildSuccessResponse(Map.of("hall", hall));
	}
	
	@PatchMapping("/halls/{hallId}")
	public ResponseEntity<Map<String, Object>> updateHall(@PathVariable String hallId,
	                                                      @Valid @RequestBody CreateHallBody body,
	                                                      @RequestHeader String Authorization) {
		try {
			jwtHelper.isAdminMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		
		Hall hall = new Hall();
		hall.setName(body.getName());
		hall.setSeatPrice(body.getSeatPrice());
		try {
			Hall updatedHall = movieService.updateHall(hallId, hall);
			return ResponseHelper.buildSuccessResponse(Map.of("hall", updatedHall));
		} catch (Exception e) {
			return ResponseHelper.buildNotFoundResponse();
		}
	}
	
	@DeleteMapping("/halls/{hallId}")
	public ResponseEntity<Map<String, Object>> deleteHall(@PathVariable String hallId,
	                                                      @RequestHeader String Authorization) {
		try {
			jwtHelper.isAdminMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		
		try {
			movieService.deleteHall(hallId);
			return ResponseHelper.buildSuccessResponse(Map.of());
		} catch (Exception e) {
			return ResponseHelper.buildNotFoundResponse();
		}
	}
	
	@PostMapping("/movies/create")
	public ResponseEntity<Map<String, Object>> createMovie(@Valid @RequestBody CreateMovieBody body,
	                                                       @RequestHeader String Authorization) {
		try {
			jwtHelper.isAdminMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		
		Movie movie = new Movie();
		movie.setmbId(body.getMbId());
		movie.setGenres(body.getGenres());
		movie.setAgeRestriction(body.getAgeRestriction());
		movie.setTitle(body.getTitle());
		movie.setDescription(body.getDescription());
		movie.setPosterUrl(body.getPosterUrl());
		movie.setDirectors(body.getDirector());
		movie.setCast(body.getCast());
		movie.setReleaseDate(body.getReleaseDate());
		movie.setMovieDuration(body.getMovieDuration());
		movie.setTrailerUrl(body.getTrailerUrl());
		movieService.createMovie(movie);
		
		return ResponseHelper.buildSuccessResponse();
	}
	
	@PatchMapping("/movies/{movieId}")
	public ResponseEntity<Map<String, Object>> editMovie(@PathVariable String movieId,
	                                                     @Valid @RequestBody CreateMovieBody body,
	                                                     @RequestHeader String Authorization) {
		try {
			jwtHelper.isAdminMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		
		Movie movie = movieService.findMovieById(movieId);
		
		if (movie == null) {
			return ResponseHelper.buildNotFoundResponse();
		}
		
		movie.setmbId(body.getMbId());
		movie.setGenres(body.getGenres());
		movie.setAgeRestriction(body.getAgeRestriction());
		movie.setTitle(body.getTitle());
		movie.setDescription(body.getDescription());
		movie.setPosterUrl(body.getPosterUrl());
		movie.setDirectors(body.getDirector());
		movie.setCast(body.getCast());
		movie.setReleaseDate(body.getReleaseDate());
		movie.setMovieDuration(body.getMovieDuration());
		movie.setTrailerUrl(body.getTrailerUrl());
		
		movieService.updateMovie(movie);
		
		return ResponseHelper.buildSuccessResponse();
	}
	
	@DeleteMapping("/movies/{movieId}")
	public ResponseEntity<Map<String, Object>> deleteMovie(@PathVariable String movieId,
	                                                       @RequestHeader String Authorization) {
		try {
			jwtHelper.isAdminMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		
		Movie movie = movieService.findMovieById(movieId);
		
		if (movie == null) {
			return ResponseHelper.buildNotFoundResponse();
		}
		
		movieService.deleteMovie(movieId);
		
		return ResponseHelper.buildSuccessResponse();
	}
	
	@GetMapping("/movies")
	public ResponseEntity<Map<String, Object>> getMovies() {
		List<Movie> movies = movieService.getMovies();
		return ResponseHelper.buildSuccessResponse(Map.of("movies", movies));
	}
	
	@GetMapping("/movies/{movieId}")
	public ResponseEntity<Map<String, Object>> getMovie(@PathVariable String movieId) {
		Movie movie = movieService.findMovieById(movieId);
		
		if (movie == null) {
			return ResponseHelper.buildNotFoundResponse();
		}
		
		return ResponseHelper.buildSuccessResponse(Map.of("movie", movie));
	}
	
	@GetMapping("/movies/mbid/{mbId}")
	public ResponseEntity<Map<String, Object>> getMovieByMbId(@PathVariable String mbId) {
		Movie movie = movieService.findMovieByMbId(mbId);
		
		if (movie == null) {
			return ResponseHelper.buildNotFoundResponse();
		}
		
		return ResponseHelper.buildSuccessResponse(Map.of("movie", movie));
	}
	
	@PostMapping("/movies/schedules")
	public ResponseEntity<Map<String, Object>> createMovieSchedule(@Valid @RequestBody CreateScheduleBody body,
	                                                               @RequestHeader String Authorization) {
		try {
			jwtHelper.isAdminMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		
		Movie movie = movieService.findMovieById(body.getMovieId());
		Hall hall = movieService.findHallById(body.getHallId());
		
		if (movie == null || hall == null) {
			return ResponseHelper.buildNotFoundResponse();
		}
		
		try {
			movieService.createSchedule(movie, hall, body.getStartTime());
		} catch (Exception e) {
			return ResponseHelper.buildBadRequestResponse(null, e.getMessage());
		}
		
		return ResponseHelper.buildSuccessResponse();
	}
	
	@DeleteMapping("/movies/schedules/{scheduleId}")
	public ResponseEntity<Map<String, Object>> deleteMovieSchedule(@PathVariable String scheduleId,
	                                                               @RequestHeader String Authorization) {
		try {
			jwtHelper.isAdminMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		
		Schedule schedule = movieService.findScheduleById(scheduleId);
		
		if (schedule == null) {
			return ResponseHelper.buildNotFoundResponse();
		}
		
		movieService.deleteSchedule(scheduleId);
		return ResponseHelper.buildSuccessResponse();
	}
	
	@GetMapping("/movies/schedules/all-halls")
	public ResponseEntity<Map<String, Object>> getAllMoviesSchedules(
			@RequestParam(name="start_date") String startDateStr,
			@RequestParam(name="end_date") String endDateStr) {
		Date startDate, endDate;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		dateFormat.setTimeZone(TimeZone.getTimeZone("UTC+7"));
		
		try {
			startDate = dateFormat.parse(startDateStr);
			endDate = dateFormat.parse(endDateStr);
		} catch (ParseException e) {
			return ResponseHelper.buildBadRequestResponse(null, "Invalid date format");
		}
		
		List<Map<String, Object>> data = movieService.getSchedulesOfAllHalls(startDate, endDate);
		return ResponseHelper.buildSuccessResponse(Map.of("schedules", data));
	}
	
	@GetMapping("/movies/schedules/{hallId}")
	public ResponseEntity<Map<String, Object>> checkHallAvailability(@PathVariable String hallId,
	                                                                 @RequestParam(name="start_date") String startDateStr,
	                                                                 @RequestHeader String Authorization) {
		try {
			jwtHelper.isAdminMiddleware(Authorization);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseHelper.buildUnauthorizedResponse();
		}
		
		Hall hall = movieService.findHallById(hallId);
		
		if (hall == null) {
			return ResponseHelper.buildNotFoundResponse();
		}
		
		Date startDate;
		// '2025-01-21T11:01:22.485Z'
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		dateFormat.setTimeZone(TimeZone.getTimeZone("UTC+7"));
		
		try {
			startDate = dateFormat.parse(startDateStr);
		} catch (ParseException e) {
			return ResponseHelper.buildBadRequestResponse(null, "Invalid date format");
		}
		
		boolean isAvailable = movieService.isStartingTimeAvailable(hall, startDate);
		
		return ResponseHelper.buildSuccessResponse(Map.of("is_available", isAvailable, "hall", hall));
	}
	
	@GetMapping("/movies/schedules")
	public ResponseEntity<Map<String, Object>> getMovieSchedules(
			@RequestParam(name="movie_id") String movieId,
			@RequestParam(name="start_date") String startDateStr,
			@RequestParam(name="end_date") String endDateStr) {
		Movie movie = movieService.findMovieById(movieId);
		
		if (movie == null) {
			return ResponseHelper.buildNotFoundResponse();
		}
		
		Date startDate, endDate;
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		dateFormat.setTimeZone(TimeZone.getTimeZone("UTC+7"));
		
		try {
			startDate = dateFormat.parse(startDateStr);
			endDate = dateFormat.parse(endDateStr);
		} catch (ParseException e) {
			return ResponseHelper.buildBadRequestResponse(null, "Invalid date format");
		}
		
		List<Map<String, Object>> data = movieService.getSchedules(movieId, startDate, endDate);
		return ResponseHelper.buildSuccessResponse(Map.of("schedules", data));
	}
	
	@GetMapping("/movies/seats/{scheduleId}")
	public ResponseEntity<Map<String, Object>> getMovieSeats(@PathVariable String scheduleId,
	                                                            @RequestHeader String Authorization) {
		try {
			jwtHelper.isUserMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		
		Schedule schedule = movieService.findScheduleById(scheduleId);
		
		if (schedule == null) {
			return ResponseHelper.buildNotFoundResponse();
		}
		
		List<Seat> availableSeats = movieService.getAvailableSeats(schedule);
		
		return ResponseHelper.buildSuccessResponse(Map.of("schedule", schedule, "available_seats", availableSeats));
	}
	
	@PostMapping("/movies/schedules/{scheduleId}/buy")
	public ResponseEntity<Map<String, Object>> buyTicket(@PathVariable String scheduleId,
	                                                     @RequestBody Map<String, Object> body,
	                                                     @RequestHeader String Authorization) {
		try {
			jwtHelper.isUserMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		
		List<String> seatIds = (List<String>) body.get("seats");
		
		if (seatIds == null || seatIds.isEmpty()) {
			return ResponseHelper.buildBadRequestResponse(null, "Seats must be chosen");
		}
		
		List<Seat> seats = movieService.getSeatsByIds(seatIds);
		
		String cardNumber = (String) body.get("card_number");
		
		if (cardNumber == null || cardNumber.isEmpty()) {
			return ResponseHelper.buildBadRequestResponse(null, "Card number must be provided");
		}
		
		if (!movieService.areSeatIdsValid(seats, seatIds)) {
			return ResponseHelper.buildBadRequestResponse(null, "Invalid seat ids");
		}
		
		Schedule schedule = movieService.findScheduleById(scheduleId);
		
		if (schedule == null) {
			return ResponseHelper.buildNotFoundResponse();
		}
		
		try {
			movieService.buyTicket(schedule, seats, cardNumber);
		} catch (Exception e) {
			return ResponseHelper.buildBadRequestResponse(null, e.getMessage());
		}
		
		return ResponseHelper.buildSuccessResponse();
	}
	
	@GetMapping("/movies/payment-history/me")
	public ResponseEntity<Map<String, Object>> getMyPaymentHistory(@RequestHeader String Authorization) {
		User user;
		
		try {
			user = jwtHelper.isUserMiddleware(Authorization);
		} catch (Exception e) {
			return ResponseHelper.buildUnauthorizedResponse();
		}
		
		List<Map<String, Object>> payments = movieService.getPaymentHistoryByUserId(user.getId());
		
		return ResponseHelper.buildSuccessResponse(Map.of("payments", payments));
	}
 }
