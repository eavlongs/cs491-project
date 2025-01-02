package com.movie.theater.repository;

import com.movie.theater.models.Hall;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HallRepository extends MongoRepository<Hall, String> {

}
