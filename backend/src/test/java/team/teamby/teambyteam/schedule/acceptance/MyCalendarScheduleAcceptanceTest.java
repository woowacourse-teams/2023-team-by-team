package team.teamby.teambyteam.schedule.acceptance;

import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleWithTeamPlaceIdResponse;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

public class MyCalendarScheduleAcceptanceTest extends AcceptanceTest {

    private static final String JWT_PREFIX = "Bearer ";
    private static final String JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhYmNkQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.2Amns5eXoGSqLw5KW-i22lH3S85-wfNd3j6Zs2z2Fg4";

    @Nested
    @DisplayName("내 캘린더 일정 조회를 한다")
    class MyCalendarFindSchedule {

        @Test
        @DisplayName("기간으로 조회 성공한다.")
        void success() {
            // given
            final int year = 2023;
            final int month = 6;

            // when
            final ExtractableResponse<Response> response = requestMyCalendarSchedulesInPeriod(year, month);
            final List<ScheduleWithTeamPlaceIdResponse> schedules = response.jsonPath().getList("schedules", ScheduleWithTeamPlaceIdResponse.class);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(schedules).hasSize(5);
                softly.assertThat(schedules.get(0).title()).isEqualTo("3번 팀플 6월 첫날");
                softly.assertThat(schedules.get(1).title()).isEqualTo("1번 팀플 6월 일정");
                softly.assertThat(schedules.get(2).title()).isEqualTo("3번 팀플 A");
                softly.assertThat(schedules.get(3).title()).isEqualTo("1번 팀플 장기 일정");
                softly.assertThat(schedules.get(4).title()).isEqualTo("3번 팀플 B");
            });
        }
    }

    private ExtractableResponse<Response> requestMyCalendarSchedulesInPeriod(final Integer year, final Integer month) {
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
