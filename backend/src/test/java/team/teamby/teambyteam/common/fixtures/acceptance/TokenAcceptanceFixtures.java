package team.teamby.teambyteam.common.fixtures.acceptance;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;

public class TokenAcceptanceFixtures {

    private static final String REFRESH_TOKEN_HEADER = "Authorization-Refresh";
    private static final String JWT_PREFIX = "Bearer ";

    public static ExtractableResponse<Response> REISSUE_TOKEN_REQUEST(final String refreshToken) {
        return RestAssured.given().log().all()
                .header(REFRESH_TOKEN_HEADER, JWT_PREFIX + refreshToken)
                .post("/api/token/reissue")
                .then().log().all()
                .extract();
    }
}
