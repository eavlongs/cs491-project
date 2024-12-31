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
				.claim("firstName", user.getFirstName())
				.claim("lastName", user.getLastName())
				.claim("isAdmin", user.getAdmin())
				.setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 hours
				.signWith(key)
				.compact();
	}
	
	public Claims parseToken(String token) throws JwtException {
		Key key = getSigningKey();
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
}
