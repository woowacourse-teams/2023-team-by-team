package team.teamby.teambyteam.auth.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public final class JwtRefreshTokenManager extends JwtManager {

    public JwtRefreshTokenManager(
            @Value("${jwt.refresh.secret}") String jwtRefreshTokenSecret,
            @Value("${jwt.refresh.expiration}") long jwtRefreshTokenExpirationInMs) {
        this.jwtSecret = jwtRefreshTokenSecret;
        this.jwtExpirationInMs = jwtRefreshTokenExpirationInMs;
    }

}
