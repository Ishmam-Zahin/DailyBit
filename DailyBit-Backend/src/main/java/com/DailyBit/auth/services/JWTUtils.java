package com.DailyBit.auth.services;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTUtils {
    private final String secretKey = "dEZ2cm5rRkNjeUZrVlV3UmNHNndDa3dTNm9uRHQ5";
    private final long expiration = 86400000;

    public String generateToken(UserDetails userDetails) {
        return JWT.create()
                .withSubject(userDetails.getUsername())
                .withClaim("role", userDetails.getAuthorities().toString())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date((System.currentTimeMillis() + expiration)))
                .sign(Algorithm.HMAC256(secretKey));

    }

    public String extractUsername(String token) {
        return this.decodeToken(token).getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = this.extractUsername(token);
        return (username.equals(userDetails.getUsername()) && this.isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = this.decodeToken(token).getExpiresAt();
        return expirationDate.after(new Date());
    }

    public DecodedJWT decodeToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }
}
