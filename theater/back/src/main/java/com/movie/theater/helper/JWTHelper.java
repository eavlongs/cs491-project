package com.movie.theater.helper;

import com.movie.theater.models.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JWTHelper {
	@Value("${jwt.secret}")
	private String _jwtSecret;
	private static String jwtSecret;
	
	@PostConstruct
	private void init() {
		jwtSecret = this._jwtSecret;
	}
	
	private Key getSigningKey() {
		System.out.println(jwtSecret);
		byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
		return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
	}
	
	public String generateToken(User user) {
		Key key = getSigningKey();
		return Jwts.builder()
				.setSubject(user.getEmail())
				.claim("id", user.getId())
				.claim("first_name", user.getFirstName())
				.claim("last_name", user.getLastName())
				.claim("is_admin", user.getAdmin())
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 hours
				.signWith(key)
				.compact();
	}
	
	public Claims parseToken(String token) throws Exception {
		Key key = getSigningKey();
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	
	public User isUser(String token) throws Exception {
		Claims claims = parseToken(token);
		User user = new User();
		user.setId(claims.get("id", String.class));
		user.setEmail(claims.get("email", String.class));
		user.setFirstName(claims.get("first_name", String.class));
		user.setLastName(claims.get("last_name", String.class));
		user.setAdmin(claims.get("is_admin", Boolean.class));
		
		return user;
	}
	
	public User isAdmin(String token) throws Exception {
		User user = isUser(token);
		if (!user.getAdmin()) {
			throw new Exception("User is not an admin");
		}
		return user;
	}
	
	public String getToken(String authorizationHeader) {
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
			return null;
		}
		return authorizationHeader.substring(7);
	}
	
	public User isUserMiddleware(String authorizationHeader) throws Exception {
		String token = getToken(authorizationHeader);
		if (token == null) {
			throw new Exception("Token not found");
		}
		return isUser(token);
	}
	
	public User isAdminMiddleware(String authorizationHeader) throws Exception {
		String token = getToken(authorizationHeader);
		if (token == null) {
			throw new Exception("Token not found");
		}
		return isAdmin(token);
	}
}
