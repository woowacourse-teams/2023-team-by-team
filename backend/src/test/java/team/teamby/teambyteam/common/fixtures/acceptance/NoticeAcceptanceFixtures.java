package team.teamby.teambyteam.common.fixtures.acceptance;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import java.io.File;
import java.util.Collections;
import java.util.List;
import org.springframework.http.HttpHeaders;

public class NoticeAcceptanceFixtures {

    private static final String JWT_PREFIX = "Bearer ";

    private static final String EMPTY_CONTENT = "";

    public static ExtractableResponse<Response> POST_NOTICE_ONLY_IMAGE_REQUEST(
            final String authToken,
            final Long teamPlaceId,
            final List<File> files
    ) {
        return POST_NOTICE_IMAGE_AND_CONTENT_REQUEST(authToken, teamPlaceId, files, EMPTY_CONTENT);
    }

    public static ExtractableResponse<Response> POST_NOTICE_ONLY_CONTENT_REQUEST(
            final String authToken,
            final Long teamPlaceId,
            final String content
    ) {
        return POST_NOTICE_IMAGE_AND_CONTENT_REQUEST(authToken, teamPlaceId, Collections.emptyList(), content);
    }

    public static ExtractableResponse<Response> POST_NOTICE_IMAGE_AND_CONTENT_REQUEST(
            final String authToken,
            final Long teamPlaceId,
            final List<File> files,
            final String content
    ) {

        RequestSpecification request = RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + authToken)
                .multiPart("content", content);

        for (final File file : files) {
            request = request.multiPart("images", file);
        }

        return request.post("/api/team-place/{teamPlaceId}/feed/notice", teamPlaceId)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> GET_NOTICE_REQUEST(
            final String authToken,
            final Long teamPlaceId
    ) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + authToken)
                .when().log().all()
                .get("/api/team-place/{teamPlaceId}/feed/notice/recent", teamPlaceId)
                .then().log().all()
                .extract();
    }
}
