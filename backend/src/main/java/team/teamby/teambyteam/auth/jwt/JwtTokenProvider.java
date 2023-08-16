package team.teamby.teambyteam.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.auth.exception.AuthenticationException;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private static final String EXPIRED_ACCESS_TOKEN_MESSAGE = "EXPIRED_ACCESS_TOKEN";
    private static final String EXPIRED_REFRESH_TOKEN_MESSAGE = "EXPIRED_REFRESH_TOKEN";
    private final String EMAIL_KEY = "email";

    @Value("${jwt.access.secret}")
    private String jwtAccessTokenSecret;
    @Value("${jwt.access.expiration}")
    private long jwtAccessTokenExpirationInMs;

    @Value("${jwt.refresh.secret}")
    private String jwtRefreshTokenSecret;
    @Value("${jwt.refresh.expiration}")
    private long jwtRefreshTokenExpirationInMs;

    public String generateAccessToken(final String email) {
        final Date now = new Date();
        final Date expiryDate = new Date(now.getTime() + jwtAccessTokenExpirationInMs);
        final SecretKey secretKey = new SecretKeySpec(jwtAccessTokenSecret.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());

        return Jwts.builder()
                .claim(EMAIL_KEY, email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public String extractEmailFromAccessToken(final String token) {
        validateAccessToken(token);
        final Jws<Claims> claimsJws = getAccessTokenParser().parseClaimsJws(token);
        String extractedEmail = claimsJws.getBody().get(EMAIL_KEY, String.class);
        if (extractedEmail == null) {
            throw new AuthenticationException.FailAuthenticationException();
        }
        return extractedEmail;
    }

    private JwtParser getAccessTokenParser() {
        return Jwts.parserBuilder()
                .setSigningKey(jwtAccessTokenSecret.getBytes(StandardCharsets.UTF_8))
                .build();
    }

    private void validateAccessToken(final String token) {
        try {
            final Claims claims = getAccessTokenParser().parseClaimsJws(token).getBody();
        } catch (MalformedJwtException | UnsupportedJwtException e) {
            throw new AuthenticationException.FailAuthenticationException();
        } catch (ExpiredJwtException e) {
            throw new ExpiredJwtException(null, null, EXPIRED_ACCESS_TOKEN_MESSAGE);
        }
    }

    public String generateRefreshToken(final String email) {
        final Date now = new Date();
        final Date expiryDate = new Date(now.getTime() + jwtRefreshTokenExpirationInMs);
        final SecretKey secretKey = new SecretKeySpec(jwtRefreshTokenSecret.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());

        return Jwts.builder()
                .claim(EMAIL_KEY, email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public String extractEmailFromRefreshToken(final String token) {
        validateRefreshToken(token);
        final Jws<Claims> claimsJws = getRefreshTokenParser().parseClaimsJws(token);
        String extractedEmail = claimsJws.getBody().get(EMAIL_KEY, String.class);
        if (extractedEmail == null) {
            throw new AuthenticationException.FailAuthenticationException();
        }
        return extractedEmail;
    }

    private JwtParser getRefreshTokenParser() {
        return Jwts.parserBuilder()
                .setSigningKey(jwtRefreshTokenSecret.getBytes(StandardCharsets.UTF_8))
                .build();
    }

    private void validateRefreshToken(final String token) {
        try {
            final Claims claims = getRefreshTokenParser().parseClaimsJws(token).getBody();
        } catch (MalformedJwtException | UnsupportedJwtException e) {
            throw new AuthenticationException.FailAuthenticationException();
        } catch (ExpiredJwtException e) {
            throw new ExpiredJwtException(null, null, EXPIRED_REFRESH_TOKEN_MESSAGE);
        }
    }
}
