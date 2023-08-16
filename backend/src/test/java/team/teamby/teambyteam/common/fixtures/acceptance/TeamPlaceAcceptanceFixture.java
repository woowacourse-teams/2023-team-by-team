package team.teamby.teambyteam.common.fixtures.acceptance;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import team.teamby.teambyteam.teamplace.application.dto.TeamPlaceCreateRequest;

public class TeamPlaceAcceptanceFixture {

    private static final String JWT_PREFIX = "Bearer ";

    public static ExtractableResponse<Response> CREATE_TEAM_PLACE(final String token, final TeamPlaceCreateRequest request) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
                .post("/api/team-places")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> GET_TEAM_PLACE_INVITE_CODE(final String token, final Long teamPlaceId) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token)
                .get("/api/team-places/{teamPlaceId}/invite-code", teamPlaceId)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> GET_MEMBERS_REQUEST(final String token, final Long teamPlaceId) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token)
                .get("/api/team-places/{teamPlaceId}/members", teamPlaceId)
                .then().log().all()
                .extract();
    }
}
