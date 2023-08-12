package team.teamby.teambyteam.auth.oauth.presentation;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.auth.oauth.application.GoogleOAuthService;
import team.teamby.teambyteam.auth.oauth.presentation.dto.GoogleLoginUrlResponse;
import team.teamby.teambyteam.auth.oauth.util.OAuthUriGenerator;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final StringBuilder sb = new StringBuilder();
    private static final String QUERY_START_MARK = "?";
    private static final String QUERY_AND_MARK = "&";
    private static final String QUERY_PARAM_ACCESS_TOKEN_KEY = "accessToken=";
    private static final String QUERY_PARAM_REFRESH_TOKEN_KEY = "refreshToken=";
    private final OAuthUriGenerator oAuthUriGenerator;
    private final GoogleOAuthService googleOAuthService;

    @GetMapping("/oauth/google/login")
    public ResponseEntity<GoogleLoginUrlResponse> getGoogleLoginUrl() {
        String url = oAuthUriGenerator.generate();
        return ResponseEntity.ok(new GoogleLoginUrlResponse(url));
    }

    @GetMapping("/code/google")
    public void googleRedirect(final HttpServletResponse response, @RequestParam final String code) throws IOException {
        final String baseUrl = "/login";
        final String accessToken = googleOAuthService.createToken(code).accessToken();
        final String refreshToken = googleOAuthService.createToken(code).refreshToken();

        StringBuilder url = sb.append(baseUrl)
                .append(QUERY_START_MARK)
                .append(QUERY_PARAM_ACCESS_TOKEN_KEY)
                .append(accessToken)
                .append(QUERY_AND_MARK)
                .append(QUERY_PARAM_REFRESH_TOKEN_KEY)
                .append(refreshToken);

        response.sendRedirect(url.toString());
    }
}
