package team.teamby.teambyteam.auth.oauth.presentation;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.auth.oauth.application.GoogleOAuthService;
import team.teamby.teambyteam.auth.oauth.util.OAuthUriGenerator;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String BEARER_TYPE = "Bearer ";
    private final OAuthUriGenerator oAuthUriGenerator;
    private final GoogleOAuthService googleOAuthService;

    @GetMapping("/oauth/google/login")
    public void googleLogin(final HttpServletResponse response) throws IOException {
        String url = oAuthUriGenerator.generate();
        response.sendRedirect(url);
    }

    @GetMapping("/code/google")
    public void googleRedirect(final HttpServletResponse response, @RequestParam final String code) throws IOException {
        response.addHeader(HttpHeaders.AUTHORIZATION, BEARER_TYPE + googleOAuthService.createToken(code).accessToken());
        response.sendRedirect("/");
    }
}
