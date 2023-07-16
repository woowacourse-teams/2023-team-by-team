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

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

public class ScheduleAcceptanceTest extends AcceptanceTest {

    private static final String JWT_PREFIX = "Bearer ";
    private static final String JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhYmNkQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.2Amns5eXoGSqLw5KW-i22lH3S85-wfNd3j6Zs2z2Fg4";


    @Nested
    @DisplayName("팀플레이스 내 특정 일정 조회")
    class FindTest {

        @Test
        @DisplayName("팀에서 아이디를 가지고 특정 일정을 조회한다.")
        public void getSpecificSchedule() {
            // given
            final Long teamPlaceId = 1L;
            final Long scheduleId = 1L;

            // when
            ExtractableResponse<Response> response = requestSpecificSchedule(scheduleId, teamPlaceId);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(response.jsonPath().getString("title")).isEqualTo("1번 팀플 N시간 일정");
                softly.assertThat(response.jsonPath().getString("startDateTime")).isEqualTo("2023-07-12 10:00");
                softly.assertThat(response.jsonPath().getString("endDateTime")).isEqualTo("2023-07-12 18:00");
            });
        }

        @Test
        @DisplayName("존재하지 않는 일정 조회시도시 실패한다.")
        void failGetScheduleWhichIsNotExist() {
            // given
            final Long teamPlaceId = 1L;
            final Long wrongScheduleId = 100L;

            // when
            ExtractableResponse<Response> response = requestSpecificSchedule(wrongScheduleId, teamPlaceId);

            // then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
        }

        @Test
        @DisplayName("다른팀의 일정 조회 시도시 실패한다.")
        void failGetScheduleWhichIsNot() {
            // given
            final Long teamPlaceId = 2L;
            final Long wrongScheduleId = 1L;

            // when
            ExtractableResponse<Response> response = requestSpecificSchedule(wrongScheduleId, teamPlaceId);

            // then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
        }

        private ExtractableResponse<Response> requestSpecificSchedule(final Long scheduleId, final Long teamPlaceId) {
            return RestAssured.given().log().all()
                    .header(new Header("Authorization", JWT_PREFIX + JWT_TOKEN))
                    .when().log().all()
                    .get("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, scheduleId)
                    .then().log().all()
                    .extract();
        }
    }


}
