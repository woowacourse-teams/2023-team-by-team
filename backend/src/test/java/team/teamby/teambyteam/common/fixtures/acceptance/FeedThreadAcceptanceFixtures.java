package team.teamby.teambyteam.common.fixtures.acceptance;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import team.teamby.teambyteam.feed.application.dto.FeedThreadWritingRequest;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

public class FeedThreadAcceptanceFixtures {

    private static final String JWT_PREFIX = "Bearer ";

    public static ExtractableResponse<Response> POST_FEED_THREAD_REQUEST(
            final String authToken,
            final TeamPlace teamPlace,
            final FeedThreadWritingRequest request
    ) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + authToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
                .post("/api/team-place/{teamPlaceId}/feed/threads", teamPlace.getId())
                .then().log().all()
                .extract();

    }
}
