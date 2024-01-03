package team.teamby.teambyteam.common.fixtures.acceptance;

import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;

public class TeamCalendarScheduleAcceptanceFixtures {

    private static final String JWT_PREFIX = "Bearer ";

    public static ExtractableResponse<Response> REGISTER_SCHEDULE_REQUEST(final String token, final Long teamPlaceId, final ScheduleRegisterRequest request) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
                .post("/api/team-place/{teamPlaceId}/calendar/schedules", teamPlaceId)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> FIND_SPECIFIC_SCHEDULE_REQUEST(final String token, final Long scheduleId, final Long teamPlaceId) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .when().log().all()
                .get("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, scheduleId)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> FIND_PERIOD_SCHEDULE_REQUEST(final String token, final Long teamPlaceId, final Integer year, final Integer month) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .pathParam("teamPlaceId", teamPlaceId)
                .queryParam("year", year)
                .queryParam("month", month)
                .when().log().all()
                .get("/api/team-place/{teamPlaceId}/calendar/schedules")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> FIND_PERIOD_SCHEDULE_REQUEST(final String token, final Long teamPlaceId, final String startDate, final String endDate) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .pathParam("teamPlaceId", teamPlaceId)
                .queryParam("startDate", startDate)
                .queryParam("endDate", endDate)
                .when().log().all()
                .get("/api/team-place/{teamPlaceId}/calendar/schedules")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> FIND_DAILY_SCHEDULE_REQUEST(final String token, final Long teamPlaceId, final int year, final int month, final int day) {
        return RestAssured.given().log().all()
                .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token))
                .pathParam("teamPlaceId", teamPlaceId)
                .queryParam("year", year)
                .queryParam("month", month)
                .queryParam("day", day)
                .when().log().all()
                .get("/api/team-place/{teamPlaceId}/calendar/schedules")
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> UPDATE_SCHEDULE_REQUEST(final String token, final Long id, final Long teamPlaceId, final ScheduleUpdateRequest request) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
                .patch("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, id)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> DELETE_SCHEDULE_REQUEST(final String token, final Long teamPlaceId, final Long scheduleId) {
        return RestAssured.given().log().all()
                .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .delete("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, scheduleId)
                .then().log().all()
                .extract();
    }
}
