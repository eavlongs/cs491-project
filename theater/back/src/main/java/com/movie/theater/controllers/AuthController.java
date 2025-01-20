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

import java.lang.reflect.Field;
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
		User existingUser = authService.findByEmail(body.getEmail());
		
		if (existingUser != null) {
			return ResponseHelper.buildBadRequestResponse(null, "User with email already exists");
		}
		
		System.out.println("Registering user");
		User user = new User();
		user.setEmail(body.getEmail());
		user.setPassword(passwordEncoder.encode(body.getPassword()));
		user.setFirstName(body.getFirstName());
		user.setLastName(body.getLastName());
		user.setAdmin(false);

		authService.register(user);
		
		String token = jwtHelper.generateToken(user);

        User userToReturn = new User();
        userToReturn.setId(user.getId());
        userToReturn.setEmail(user.getEmail());
        userToReturn.setFirstName(user.getFirstName());
        userToReturn.setLastName(user.getLastName());
        userToReturn.setAdmin(user.getAdmin());
		
		return ResponseHelper.buildSuccessResponse(Map.of("token", token, "user", userToReturn));
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody RegisterBody body) {
		User user = authService.findByEmail(body.getEmail());
		System.out.println("here");
		if (user == null || !passwordEncoder.matches(body.getPassword(), user.getPassword())) {
			return ResponseHelper.buildBadRequestResponse(null, "Invalid email or password");
		}

		String token = jwtHelper.generateToken(user);
		System.out.println("here 2");

		User userToReturn = new User();
        userToReturn.setId(user.getId());
        userToReturn.setEmail(user.getEmail());
        userToReturn.setFirstName(user.getFirstName());
        userToReturn.setLastName(user.getLastName());
        userToReturn.setAdmin(user.getAdmin());
		System.out.println("here 3");
		return ResponseHelper.buildSuccessResponse(Map.of("token", token, "user", userToReturn));
	}
	
	private void printObjectFields(Object obj) {
		Class<?> objClass = obj.getClass();
		Field[] fields = objClass.getDeclaredFields();
		
		for (Field field : fields) {
			field.setAccessible(true);
			try {
				System.out.println(field.getName() + ": " + field.get(obj));
			} catch (IllegalAccessException e) {
				System.out.println("Could not access field: " + field.getName());
			}
		}
	}
}
