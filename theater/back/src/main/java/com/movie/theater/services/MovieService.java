package com.movie.theater.services;

import com.movie.theater.models.*;
import com.movie.theater.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MovieService {
	@Autowired
	private HallRepository hallRepository;
	@Autowired
	private SeatRepository seatRepository;
	@Autowired
	private MovieRepository movieRepository;
	@Autowired
	private ScheduleRepository scheduleRepository;
	@Autowired
	private TicketRepository ticketRepository;
	@Autowired
	private PaymentRepository paymentRepository;
	
	public List<Hall> getHalls() {
		return hallRepository.findAll();
	}
	
	public Hall findHallById(String id) {
		return hallRepository.findById(id).orElse(null);
	}
	
	public void createHall(Hall hall) {
		System.out.println("creating hall" + hall.getName() + hall.getSeatPrice());
		hallRepository.save(hall);
	}
	
	public Hall updateHall(String hallId, Hall hall) throws NoSuchElementException {
		Hall hallToUpdate = hallRepository.findById(hallId).orElseThrow();
		hallToUpdate.setName(hall.getName());
		hallToUpdate.setSeatPrice(hall.getSeatPrice());
		return hallRepository.save(hallToUpdate);
	}
	
	public void deleteHall(String hallId) throws NoSuchElementException {
		hallRepository.findById(hallId).orElseThrow();
		hallRepository.deleteById(hallId);
		seatRepository.deleteByHallId(hallId);
	}
	
	public void createSeatsInHall(String hallId) throws Exception {
		hallRepository.findById(hallId).orElseThrow();
		int rows = 3, cols = 3;
		List<Seat> seats = new ArrayList<>(rows * cols);
		
		// using the alphabet and number convention for seat codes implicitly limits the number of rows to 26
		String aToZ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < cols; j++) {
				Seat seat = new Seat();
				seat.setHallId(hallId);
				seat.setRowNumber(i + 1);
				seat.setColNumber(j + 1);
				seat.setCode(aToZ.charAt(i) + String.valueOf(j + 1));
				seats.add(seat);
			}
		}
		
		seatRepository.saveAll(seats);
	}
	
	public void createMovie(Movie movie) {
		movieRepository.save(movie);
	}
	
	public Movie findMovieById(String id) {
		return movieRepository.findById(id).orElse(null);
	}
	
	public Movie findMovieByMbId(String mbId) {
		System.out.println(mbId);
		return movieRepository.findByMbId(mbId);
	}
	
	public void updateMovie(Movie movie) {
		movieRepository.save(movie);
	}
	
	public void deleteMovie(String movieId) {
		movieRepository.deleteById(movieId);
	}
	
	public List<Movie> getMovies() {
		return movieRepository.findAll();
	}
	
	public void createSchedule(Movie movie, Hall hall, Date startTime) throws Exception {
		if (!isScheduleAvailable(movie, hall, startTime)) throw new Exception("Schedule not available");
		
		Schedule schedule = new Schedule();
		schedule.setMovieId(movie.getId());
		schedule.setHallId(hall.getId());
		schedule.setStartTime(startTime);
		schedule.setEndTime(getEndTime(startTime, movie.getMovieDuration()));
		
		scheduleRepository.save(schedule);
	}
	
	public boolean isStartingTimeAvailable(Hall hall, Date startTime) {
		Date endTime = new Date(startTime.getTime() + 1000 * 60 * 60);
		
		// query if there is any movie after startTime but before endTime in the same hall
		Schedule schedule = scheduleRepository.getSceduleByHallIdAndStartTimeBetween(hall.getId(), startTime, endTime);
		
		return schedule == null;
	}
	
	public boolean isScheduleAvailable(Movie movie, Hall hall, Date startTime) {
		Date endTime = getEndTime(startTime, movie.getMovieDuration());
		
		// query if there is any movie after startTime but before endTime in the same hall
		Schedule schedule = scheduleRepository.getSceduleByHallIdAndStartTimeBetween(hall.getId(), startTime, endTime);
		
		return schedule == null;
	}
	
	public Date getEndTime(Date startTime, int duration) {
		return new Date(startTime.getTime() + (long) duration * 60 * 1000);
	}
	
	public Schedule findScheduleById(String id) {
		return scheduleRepository.findById(id).orElse(null);
	}
	
	public List<Seat> getAvailableSeats(Schedule schedule) {
		return seatRepository.getAvailableSeats(schedule);
	}
	
	public void deleteSchedule(String scheduleId) {
		scheduleRepository.deleteById(scheduleId);
	}
	
	public List<Map<String, Object>> getSchedulesOfAllHalls(Date startDate, Date endDate) {
		List<Schedule> schedules = scheduleRepository.getSchedulesOfAllMovieWithinTimeframe(startDate, endDate);
		
		// add movie info to each schedule object
		Map<String, Object> movieMap = new HashMap<>();
		
		List<Movie> movies = movieRepository.findAll();
		
		for (Movie movie : movies) {
			movieMap.put(movie.getId(), movie);
		}
		
		// add hall info to each schedule object
		Map<String, Object> hallMap = new HashMap<>();
		
		List<Hall> halls = hallRepository.findAll();
		
		for (Hall hall : halls) {
			hallMap.put(hall.getId(), hall);
		}
		
		ArrayList<Map<String, Object>> result = new ArrayList<>(schedules.size());
		
		for (Schedule schedule : schedules) {
			Map<String, Object> scheduleMap = new HashMap<>();
			scheduleMap.put("schedule", schedule);
			scheduleMap.put("hall", hallMap.get(schedule.getHallId()));
			scheduleMap.put("movie", movieMap.get(schedule.getMovieId()));
			result.add(scheduleMap);
		}
		
		// structure of result = {schedule: Schedule, hall: Hall, movie: Movie}[]
		
		return result;
	}
	
	public List<Map<String, Object>> getSchedules(String movieId, Date startDate, Date endDate) {
		List<Schedule> schedules = scheduleRepository.getSchedulesByMovieIdAndWithinTimeframe(movieId, startDate, endDate);
		
		// add hall info to each schedule object
		Map<String, Object> hallMap = new HashMap<>();
		
		List<Hall> halls = hallRepository.findAll();
		
		for (Hall hall : halls) {
			hallMap.put(hall.getId(), hall);
		}
		
		ArrayList<Map<String, Object>> result = new ArrayList<>(schedules.size());
		
		for (Schedule schedule : schedules) {
			Map<String, Object> scheduleMap = new HashMap<>();
			scheduleMap.put("schedule", schedule);
			scheduleMap.put("hall", hallMap.get(schedule.getHallId()));
			result.add(scheduleMap);
		}
		
		// structure of result = {schedule: Schedule, hall: Hall}[]
		
		return result;
	}
	
	public List<Seat> getSeatsByIds(List<String> seatIds) {
		return seatRepository.getSeatsByIds(seatIds);
	}
	
	public boolean areSeatIdsValid(List<Seat> seats, List<String> seatIds) {
		Set<String> seatIdSet = new HashSet<>(seatIds);
		
		for (Seat seat : seats) {
			if (!seatIdSet.contains(seat.getId())) return false;
		}
		
		return true;
	}
	
	public void buyTicket(Schedule schedule, List<Seat> seats, String cardNumber) throws Exception {
		if (!areSeatsAvailable(schedule, seats)) throw new Exception("One or more of the seats are not available");
		
		Hall hall = hallRepository.findById(schedule.getHallId()).orElse(null);
		// make payment
		Payment payment = new Payment();
		payment.setCardNumber(cardNumber);
		assert hall != null;
		payment.setAmount(seats.size() * hall.getSeatPrice());
		payment.setCreatedAt(new Date());
		paymentRepository.save(payment);
		
		ArrayList<Ticket> tickets = new ArrayList<>(seats.size());
		for (Seat seat : seats) {
			Ticket ticket = new Ticket();
			ticket.setScheduleId(schedule.getId());
			ticket.setSeatId(seat.getId());
			ticket.setPaymentId(payment.getId());
			tickets.add(ticket);
		}
		
		ticketRepository.saveAll(tickets);
	}
	
	private boolean areSeatsAvailable(Schedule schedule, List<Seat> seats) {
		List<Ticket> ticketsSole = ticketRepository.getTicketByScheduleIdAndSeatIds(schedule.getId(), seats.stream().map(Seat::getId).toList());
		
		return ticketsSole.isEmpty();
	}
	
	public List<Map<String, Object>> getPaymentHistoryByUserId(String userId) {
		return paymentRepository.getPaymentsWithTicketsByUserId(userId);
	}
}
