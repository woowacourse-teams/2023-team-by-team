package team.teamby.teambyteam.auth.jwt;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public final class JwtAccessTokenManager extends JwtManager {

    public JwtAccessTokenManager(
            @Value("${jwt.access.secret}") String jwtAccessTokenSecret,
            @Value("${jwt.access.expiration}") long jwtAccessTokenExpirationInMs) {
        this.jwtSecret = jwtAccessTokenSecret;
        this.jwtExpirationInMs = jwtAccessTokenExpirationInMs;
    }

}
