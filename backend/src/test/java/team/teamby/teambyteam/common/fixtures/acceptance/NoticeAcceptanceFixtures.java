package team.teamby.teambyteam.common.fixtures.acceptance;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

public class NoticeAcceptanceFixtures {

    private static final String JWT_PREFIX = "Bearer ";

    public static ExtractableResponse<Response> POST_NOTICE_REQUEST(
            final String authToken,
            final TeamPlace teamPlace,
            final NoticeRegisterRequest request
            ) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + authToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
                .post("/api/team-place/{teamPlaceId}/feed/notice", teamPlace.getId())
                .then().log().all()
                .extract();
    }

}
