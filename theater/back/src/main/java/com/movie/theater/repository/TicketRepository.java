package com.movie.theater.repository;

import com.movie.theater.models.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface TicketRepository extends MongoRepository<Ticket, String> {
	@Query("{ 'scheduleId' : ?0, 'seatId' : { $in : ?1 } }")
	List<Ticket> getTicketByScheduleIdAndSeatIds(String scheduleId, List<String> seatIds);
	
	List<Ticket> findByPaymentId(String paymentId);
	
	List<Ticket> findByScheduleId(String scheduleId);
}
