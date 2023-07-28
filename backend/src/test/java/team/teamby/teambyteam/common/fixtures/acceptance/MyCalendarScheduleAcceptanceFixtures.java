package team.teamby.teambyteam.common.fixtures.acceptance;

import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;

public class MyCalendarScheduleAcceptanceFixtures {

    private static final String JWT_PREFIX = "Bearer ";
    private static final String JWT_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InBpaWx5YW5nLmRldkBnbWFpbC5jb20iLCJpYXQiOjE2OTA0MzEzMDIsImV4cCI6MTY5MTQzMTMwMn0.W32l9nFapiQXUuQ2WzQ8-X8PA8VsDIX1rC1X67PWcn0";

    public static ExtractableResponse<Response> FIND_PERIOD_SCHEDULE_REQUEST(final Integer year, final Integer month) {
        return RestAssured.given().log().all()
                .header(new Header("Authorization", JWT_PREFIX + JWT_TOKEN))
                .queryParam("year", year)
                .queryParam("month", month)
                .when().log().all()
                .get("/api/my-calendar/schedules")
                .then().log().all()
                .extract();
    }
}
