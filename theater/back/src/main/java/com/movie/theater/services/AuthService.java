package com.movie.theater.services;

import com.movie.theater.models.User;
import com.movie.theater.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
	@Autowired
	private UserRepository userRepository;
	
	public void register(User user) {
		 userRepository.save(user);
	}
	
	public User findByEmail(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}
}
