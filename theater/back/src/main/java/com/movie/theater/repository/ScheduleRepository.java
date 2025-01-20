package com.movie.theater.repository;

import com.movie.theater.models.Schedule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;

public interface ScheduleRepository extends MongoRepository<Schedule, String> {
	@Query(value = "{ 'hallId' : ?0, 'startTime' : { $gte : ?1, $lte : ?2 } }")
	Schedule getSceduleByHallIdAndStartTimeBetween(String id, Date startTime, Date endTime);
	
	@Query(value = "{ 'movieId' : ?0, 'startTime' : { $gte : ?1, $lte : ?2 } }")
	List<Schedule> getSchedulesByMovieIdAndWithinTimeframe(String id, Date startDate, Date endDate);
	
	@Query(value = "{ 'startTime' : { $gte : ?0, $lte : ?1 } }")
	List<Schedule> getSchedulesOfAllMovieWithinTimeframe(Date startDate, Date endDate);
}
