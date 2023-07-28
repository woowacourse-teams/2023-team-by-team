package team.teamby.teambyteam.auth.jwt;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import team.teamby.teambyteam.auth.exception.AuthenticationException;

@Component
public class JwtTokenExtractor {

    private static final String PREFIX_BEARER = "Bearer ";

    public String extractToken(final HttpServletRequest request) {
        final String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(PREFIX_BEARER)) {
            return bearerToken.substring(PREFIX_BEARER.length());
        }
        throw new AuthenticationException.UnSupportAuthenticationException();
    }
}
