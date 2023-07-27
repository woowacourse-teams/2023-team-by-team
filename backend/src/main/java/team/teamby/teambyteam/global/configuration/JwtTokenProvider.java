package team.teamby.teambyteam.global.configuration;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.member.exception.MemberException;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final String EMAIL_KEY = "email";

    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.expiration}")
    private long jwtExpirationInMs;

    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
        SecretKey secretKey = new SecretKeySpec(jwtSecret.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());

        return Jwts.builder()
                .claim(EMAIL_KEY, email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public String extractEmailFromToken(String token) {
        validate(token);
        final Jws<Claims> claimsJws = getParser().parseClaimsJws(token);
        return claimsJws.getBody().get(EMAIL_KEY, String.class);
    }

    private JwtParser getParser() {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8))
                .build();
    }

    public void validate(String token) {
        try {
            Claims claims = getParser().parseClaimsJws(token).getBody();
            validateExpiration(claims);
        } catch (MalformedJwtException
                 | UnsupportedJwtException | IllegalArgumentException e) {
            throw new MemberException.UnSupportAuthenticationException();
        }
    }

    private void validateExpiration(Claims claims) {
        Date now = new Date();
        Date expiration = claims.getExpiration();
        if (now.after(expiration)) {
            throw new ExpiredJwtException(null, claims, "토큰이 만료되었습니다.");
        }
    }
}
