package team.teamby.teambyteam.auth.oauth.client;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import team.teamby.teambyteam.auth.oauth.application.dto.GoogleTokenResponse;
import team.teamby.teambyteam.auth.oauth.config.GoogleOAuthProperties;

@Component
public final class GoogleOAuthClient implements OAuthClient {

    private static final String OAUTH_GRANT_TYPE = "authorization_code";
    private final GoogleOAuthProperties googleOAuthProperties;
    private final RestTemplate restTemplate;

    public GoogleOAuthClient(final GoogleOAuthProperties googleOAuthProperties, final RestTemplateBuilder restTemplateBuilder) {
        this.googleOAuthProperties = googleOAuthProperties;
        this.restTemplate = restTemplateBuilder.build();
    }

    @Override
    public GoogleTokenResponse getGoogleAccessToken(final String code) {
        final HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        final MultiValueMap<String, String> params = generateParams(code);
        final HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, httpHeaders);
        final ResponseEntity<GoogleTokenResponse> googleTokenResponseResponseEntity = restTemplate.postForEntity(googleOAuthProperties.getTokenUri(), request, GoogleTokenResponse.class);

        return googleTokenResponseResponseEntity.getBody();
    }

    private MultiValueMap<String, String> generateParams(final String code) {
        final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", googleOAuthProperties.getClientId());
        params.add("client_secret", googleOAuthProperties.getClientSecret());
        params.add("redirect_uri", googleOAuthProperties.getRedirectUri());
        params.add("grant_type", OAUTH_GRANT_TYPE);
        return params;
    }
}
