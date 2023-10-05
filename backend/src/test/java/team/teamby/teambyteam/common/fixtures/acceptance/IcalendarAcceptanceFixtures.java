package team.teamby.teambyteam.common.fixtures.acceptance;

import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;

public class IcalendarAcceptanceFixtures {

    private static final String JWT_PREFIX = "Bearer ";

    public static ExtractableResponse<Response> GET_ICALENDAR_PUBLISHED_URL(final String token, final Long teamPlaceId) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .when().log().all()
                .get("/api/team-place/{teamPlaceId}/icalendar-url", teamPlaceId)
                .then().log().all()
                .extract();
    }
}
