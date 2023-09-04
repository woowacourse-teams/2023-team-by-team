package team.teamby.teambyteam.common.fixtures.acceptance;

import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;

public class MemberAcceptanceFixture {

    private static final String JWT_PREFIX = "Bearer ";

    public static ExtractableResponse<Response> GET_MY_INFORMATION(final String token) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .when().log().all()
                .get("/api/me")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> GET_PARTICIPATED_TEAM_PLACES(final String token) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .when().log().all()
                .get("/api/me/team-places")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> DELETE_LEAVE_TEAM_PLACE(final String token, final Long teamPlaceId) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .when().log().all()
                .delete("/api/me/team-places/{teamPlaceId}", teamPlaceId)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> DELETE_ACCOUNT(final String token) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .when().log().all()
                .delete("/api/me/account")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> PARTICIPATE_TEAM_PLACE_REQUEST(final String token, final String inviteCode) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .when().log().all()
                .post("/api/me/team-places/{inviteCode}", inviteCode)
                .then().log().all()
                .extract();
    }
}
