package team.teamby.teambyteam.token.presentation;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.auth.jwt.JwtTokenExtractor;
import team.teamby.teambyteam.token.application.TokenService;
import team.teamby.teambyteam.token.application.dto.TokenResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/token")
public class TokenController {

    private static final String ACCESS_TOKEN_HEADER = HttpHeaders.AUTHORIZATION;
    private static final String REFRESH_TOKEN_HEADER = "Authorization-Refresh";

    private final JwtTokenExtractor jwtTokenExtractor;
    private final TokenService tokenService;

    @PostMapping("/reissue")
    public ResponseEntity<Void> reissueAccessToken(final HttpServletRequest request, final HttpServletResponse response) {
        String refreshToken = jwtTokenExtractor.extractRefreshToken(request);
        TokenResponse tokenResponse = tokenService.reissueToken(refreshToken);
        response.setHeader(ACCESS_TOKEN_HEADER, tokenResponse.accessToken());
        response.setHeader(REFRESH_TOKEN_HEADER, tokenResponse.refreshToken());
        return ResponseEntity.ok().build();
    }
}
