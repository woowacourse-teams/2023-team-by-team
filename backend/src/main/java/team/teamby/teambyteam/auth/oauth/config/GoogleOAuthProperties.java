package team.teamby.teambyteam.auth.oauth.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Getter
@Component
public class GoogleOAuthProperties {

    @Value("${oauth.google.client-id}")
    private String clientId;

    @Value("${oauth.google.client-secret}")
    private String clientSecret;

    @Value("${oauth.google.end-point}")
    private String endPoint;

    @Value("${oauth.google.response-type}")
    private String responseType;

    @Value("${oauth.google.scopes}")
    private List<String> scopes;

    @Value("${oauth.google.access-type}")
    private String accessType;

    @Value("${oauth.google.token-uri}")
    private String tokenUri;

    @Value("${oauth.google.redirect-uri}")
    private String redirectUri;
}
