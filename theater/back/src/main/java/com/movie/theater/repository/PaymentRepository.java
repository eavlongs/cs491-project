package com.movie.theater.repository;

import com.movie.theater.models.Payment;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Map;

public interface PaymentRepository extends MongoRepository<Payment, String> {
	@Aggregation(pipeline = {
			"{ $match: { 'userId': ?0 } }",
			"{ $lookup: { from: 'tickets', localField: '_id', foreignField: 'paymentId', as: 'tickets' } }",
			"{ $project: { _id: 1, cardNumber: 1, amount: 1, createdAt: 1, tickets: 1 } }"
	})
	List<Map<String, Object>> getPaymentsWithTicketsByUserId(String userId);
}
