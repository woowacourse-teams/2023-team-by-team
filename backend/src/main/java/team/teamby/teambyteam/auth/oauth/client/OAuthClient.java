package team.teamby.teambyteam.auth.oauth.client;

import team.teamby.teambyteam.auth.oauth.application.dto.GoogleTokenResponse;

public interface OAuthClient {

    GoogleTokenResponse getGoogleAccessToken(final String code);
}
