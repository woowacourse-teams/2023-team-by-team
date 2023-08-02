package team.teamby.teambyteam.auth.oauth.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.auth.oauth.config.GoogleOAuthProperties;

@RequiredArgsConstructor
@Component
public class GoogleOAuthUriGenerator implements OAuthUriGenerator {

    private final GoogleOAuthProperties googleOAuthProperties;

    @Override
    public String generate() {
        return googleOAuthProperties.getEndPoint() + "?"
                + "client_id=" + googleOAuthProperties.getClientId() + "&"
                + "redirect_uri=" + googleOAuthProperties.getRedirectUri() + "&"
                + "response_type=" + googleOAuthProperties.getResponseType() + "&"
                + "scope=" + String.join(" ", googleOAuthProperties.getScopes()) + "&"
                + "access_type=" + googleOAuthProperties.getAccessType();
    }
}
