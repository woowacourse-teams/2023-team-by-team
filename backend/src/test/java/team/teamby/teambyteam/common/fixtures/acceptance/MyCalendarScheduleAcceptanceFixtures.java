package team.teamby.teambyteam.common.fixtures.acceptance;

import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;

public class MyCalendarScheduleAcceptanceFixtures {

    private static final String JWT_PREFIX = "Bearer ";

    public static ExtractableResponse<Response> FIND_PERIOD_SCHEDULE_REQUEST(final String token, final Integer year, final Integer month) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .queryParam("year", year)
                .queryParam("month", month)
                .when().log().all()
                .get("/api/my-calendar/schedules")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> FIND_PERIOD_SCHEDULE_REQUEST(
            final String token,
            final String startDate,
            final String endDate
    ) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .queryParam("startdate", startDate)
                .queryParam("enddate", endDate)
                .when().log().all()
                .get("/api/my-calendar/schedules")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> FIND_DAILY_SCHEDULE_REQUEST(final String token, final Integer year, final Integer month, final Integer day) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .queryParam("year", year)
                .queryParam("month", month)
                .queryParam("day", day)
                .when().log().all()
                .get("/api/my-calendar/schedules")
                .then().log().all()
                .extract();
    }
}
