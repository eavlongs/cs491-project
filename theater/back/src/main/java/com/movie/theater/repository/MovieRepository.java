package com.movie.theater.repository;

import com.movie.theater.models.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface MovieRepository extends MongoRepository<Movie, String> {
	@Query("{ 'mbId' : ?0 }")
	Movie findByMbId(String mbId);
}
