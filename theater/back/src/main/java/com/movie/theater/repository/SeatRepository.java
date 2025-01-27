package com.movie.theater.repository;

import com.movie.theater.models.Seat;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface SeatRepository extends MongoRepository<Seat, String> {
	void deleteByHallId(String hallId);
	
	@Query("{ '_id': { $in: ?0 } }")
	List<Seat> getSeatsByIds(List<String> seatIds);
	
//	@Aggregation(pipeline = {
//			"{ $match: { hallId: ?0 } }",
//			"{ $lookup: { from: 'tickets', localField: '_id', foreignField: 'seatId', as: 'tickets' } }",
//			"{ $match: { 'tickets.scheduleId': { $ne:  ?1 } } }",
//	})
//	List<Seat> getAvailableSeats(String hallId, String scheduleId);
//
	List<Seat> findByHallId(String hallId);
}
