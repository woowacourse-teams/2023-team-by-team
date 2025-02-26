package team.teamby.teambyteam.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import team.teamby.teambyteam.auth.exception.AuthenticationException;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Objects;

@Component
public abstract class JwtManager {

    protected static final String PREFIX_BEARER = "Bearer ";
    protected static final String EMAIL_KEY = "email";
    protected static final String EXPIRED_TOKEN_MESSAGE = "EXPIRED_TOKEN";

    protected String jwtSecret;
    protected long jwtExpirationInMs;

    public String generateToken(final String email) {
        final Date now = new Date();
        final Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
        final SecretKey secretKey = new SecretKeySpec(
                jwtSecret.getBytes(StandardCharsets.UTF_8),
                SignatureAlgorithm.HS256.getJcaName());

        return Jwts.builder()
                .claim(EMAIL_KEY, email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public String parseToken(final String authorizationHeader){
        if (!(StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith(PREFIX_BEARER))) {
            final String logMessage = "인증 실패(액세스 토큰 추출 실패) - 인증헤더 : " + authorizationHeader;
            throw new AuthenticationException.FailAuthenticationException(logMessage);
        }

        return authorizationHeader.substring(PREFIX_BEARER.length());
    }

    public Jws<Claims> parseClaims(final String token) {
        validateToken(token);

        return getTokenParser().parseClaimsJws(token);
    }

    public String parseEmail(final String token) {
        final Jws<Claims> claimsJws = parseClaims(token);
        final String extractedEmail = claimsJws.getBody().get(EMAIL_KEY, String.class);
        if (Objects.isNull(extractedEmail)) {
            final String logMessage = "인증 실패(JWT Payload 이메일 누락) - 토큰 : " + token;

            throw new AuthenticationException.FailAuthenticationException(logMessage);
        }

        return extractedEmail;
    }

    private void validateToken(final String token) {
        try {
            getTokenParser().parseClaimsJws(token).getBody();
        } catch (MalformedJwtException | UnsupportedJwtException e) {
            final String logMessage = "인증 실패(잘못된 토큰) - 토큰 : " + token;

            throw new AuthenticationException.FailAuthenticationException(logMessage);
        } catch (ExpiredJwtException e) {
            throw new ExpiredJwtException(null, null, EXPIRED_TOKEN_MESSAGE);
        }
    }

    private JwtParser getTokenParser() {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecret.getBytes(StandardCharsets.UTF_8))
                .build();
    }
}
