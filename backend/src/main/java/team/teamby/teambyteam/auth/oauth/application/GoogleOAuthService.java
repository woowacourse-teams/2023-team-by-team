package team.teamby.teambyteam.auth.oauth.application;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.auth.jwt.JwtTokenProvider;
import team.teamby.teambyteam.auth.oauth.application.dto.GoogleTokenResponse;
import team.teamby.teambyteam.auth.oauth.application.dto.TokenResponse;
import team.teamby.teambyteam.auth.oauth.client.GoogleOAuthClient;

import java.util.Base64;

@RequiredArgsConstructor
@Transactional
@Service
public class GoogleOAuthService {

    private static final String EMAIL_KEY = "email";
    private static final int PAYLOAD_INDEX = 1;

    private final JwtTokenProvider jwtTokenProvider;
    private final GoogleOAuthClient googleOAuthClient;

    public TokenResponse createToken(final String code) {
        GoogleTokenResponse googleTokenResponse = googleOAuthClient.getGoogleAccessToken(code);
        String email = extractEmailFromToken(googleTokenResponse.idToken());
        return new TokenResponse(jwtTokenProvider.generateToken(email));
    }

    private String extractEmailFromToken(final String jwtToken) {
        final String payLoad = jwtToken.split("\\.")[PAYLOAD_INDEX];
        final String decodedPayLoad = new String(Base64.getDecoder().decode(payLoad));
        final JacksonJsonParser jacksonJsonParser = new JacksonJsonParser();
        return (String) jacksonJsonParser.parseMap(decodedPayLoad)
                .get(EMAIL_KEY);
    }
}
