package com.movie.theater.controllers;

import com.movie.theater.dto.RegisterBody;
import com.movie.theater.helper.JWTHelper;
import com.movie.theater.helper.ResponseHelper;
import com.movie.theater.models.User;
import com.movie.theater.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private AuthService authService;
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private final JWTHelper jwtHelper = new JWTHelper();
	
	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterBody body) {
		System.out.println("Registering user");
		User user = new User();
		user.setEmail(body.getEmail());
		user.setPassword(passwordEncoder.encode(body.getPassword()));
		user.setFirstName(body.getFirstName());
		user.setLastName(body.getLastName());
		user.setAdmin(false);

		authService.register(user);
		System.out.println("User registered");
		String token = jwtHelper.generateToken(user);
		System.out.println("Token generated");

		return ResponseHelper.buildSuccessResponse(Map.of("token", token));
	}
	
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody RegisterBody body) {
		User user = authService.findByEmail(body.getEmail());
		
		if (user == null || !passwordEncoder.matches(body.getPassword(), user.getPassword())) {
			return ResponseHelper.buildBadRequestResponse(null, "Invalid email or password");
		}
		
		String token = jwtHelper.generateToken(user);
		
		return ResponseHelper.buildSuccessResponse(Map.of("token", token));
	}
}
