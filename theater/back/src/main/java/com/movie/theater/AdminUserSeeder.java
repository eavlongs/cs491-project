package com.movie.theater;

import com.movie.theater.models.User;
import com.movie.theater.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class AdminUserSeeder implements ApplicationRunner {
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private final Logger log = LoggerFactory.getLogger(AdminUserSeeder.class);
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		if (args.getOptionValues("seeder") != null) {
			List<String> seeder = Arrays.asList(args.getOptionValues("seeder").get(0).split(","));
			if (seeder.contains("admin")) {
				seedAdmins();
				log.info("Success run admin seeder");
			}
		} else {
			log.info("Admin seeder skipped");
		}
	}
	
	private void seedAdmins() {
		List<User> admins = new ArrayList<>();
		
		User admin1 = new User();
		admin1.setAdmin(true);
		admin1.setEmail("admin@gmail.com");
		admin1.setPassword(passwordEncoder.encode("helloworld"));
		admin1.setFirstName("Admin");
		admin1.setLastName("User");
		
		admins.add(admin1);
		
		for (var admin : admins) {
			this.userRepository.save(admin);
			log.info("Success run AdminSeeder {}" + admin.getEmail());
		}
	}
}