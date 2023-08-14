package team.teamby.teambyteam.common.fixtures.acceptance;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import team.teamby.teambyteam.sharedlink.application.dto.SharedLinkCreateRequest;

public final class SharedLinkAcceptanceFixtures {

    private static final String JWT_PREFIX = "Bearer ";

    public static ExtractableResponse<Response> REGISTER_SHARED_LINK_REQUEST(
            final String authToken,
            final Long teamPlaceId,
            final SharedLinkCreateRequest request
    ) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + authToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
                .post("/api/team-place/{teamPlaceId}/team-links", teamPlaceId)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> GET_SHARED_LINK_REQUEST(
            final String authToken,
            final Long teamPlaceId
    ) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + authToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .get("/api/team-place/{teamPlaceId}/team-links", teamPlaceId)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> DELETE_SHARED_LINK_REQUEST(
            final String authToken,
            final Long teamPlaceId,
            final Long sharedLinkException

    ) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + authToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .delete("/api/team-place/{teamPlaceId}/team-links/{teamLinkId}", teamPlaceId, sharedLinkException)
                .then().log().all()
                .extract();
    }
}
