package team.teamby.teambyteam.schedule.acceptance;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.fixtures.ScheduleFixtures.Schedule1_N_Hour;

public class ScheduleAcceptanceTest extends AcceptanceTest {

    @Autowired
    private ObjectMapper objectMapper;

    private static final String JWT_PREFIX = "Bearer ";
    private static final String JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhYmNkQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.2Amns5eXoGSqLw5KW-i22lH3S85-wfNd3j6Zs2z2Fg4";
    private static final String REQUEST_TITLE_KEY = "title";
    private static final String REQUEST_START_DATE_TIME_KEY = "startDateTime";
    private static final String REQUEST_END_DATE_KEY = "endDateTime";


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
            final ExtractableResponse<Response> response = requestSpecificSchedule(scheduleId, teamPlaceId);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(response.jsonPath().getString("title")).isEqualTo("1번 팀플 N시간 일정");
                softly.assertThat(response.jsonPath().getString("startDateTime")).isEqualTo("2023-07-12 10:00");
                softly.assertThat(response.jsonPath().getString("endDateTime")).isEqualTo("2023-07-12 18:00");
            });
        }

        @DisplayName("존재하지 않는 일정 조회시도시 실패한다.")
        void failGetScheduleWhichIsNotExist() {
            // given
            final Long teamPlaceId = 1L;
            final Long wrongScheduleId = 100L;

            // when
            final ExtractableResponse<Response> response = requestSpecificSchedule(wrongScheduleId, teamPlaceId);

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
            final ExtractableResponse<Response> response = requestSpecificSchedule(wrongScheduleId, teamPlaceId);

            // then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
        }
    }

    @Nested
    @DisplayName("일정 등록 시")
    class RegisterSchedule {

        @Test
        @DisplayName("일정 등록에 성공한다.")
        void success() {
            // given
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;

            // when
            final ExtractableResponse<Response> successRequest = registerScheduleRequest(teamPlaceId, Schedule1_N_Hour.REQUEST);

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(successRequest.header(HttpHeaders.LOCATION)).contains("/api/team-place/" + teamPlaceId + "/calendar/schedules/");
            });
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "    "})
        @DisplayName("일정 제목이 빈 값인 요청이면 실패한다.")
        void failBlankTitleRequest(final String blankTitle) {
            // given
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final ScheduleRegisterRequest request = new ScheduleRegisterRequest(blankTitle, Schedule1_N_Hour.START_DATE_TIME, Schedule1_N_Hour.END_DATE_TIME);

            // when
            final ExtractableResponse<Response> blankTitleRequest = registerScheduleRequest(teamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(blankTitleRequest.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(blankTitleRequest.body().asString()).isEqualTo("제목은 빈 값일 수 없습니다.");
            });
        }

        @ParameterizedTest
        @ValueSource(strings = {"2023-07-12 10-00", "2023:07:12 10:00", "2023-07-1210:10", "2023:07:12 10-00", "2023-07-12 10:00:00"})
        @DisplayName("잘못된 날짜 형식 요청이면 실패한다.")
        void failWrongDateTimeTypeRequest(final String wrongStartDateTimeType) throws JsonProcessingException {
            // given
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final String title = Schedule1_N_Hour.TITLE;
            final String correctEndDateTimeType = "2023-07-12 18:00";

            final Map<String, String> requestMap = new HashMap<>();
            requestMap.put(REQUEST_TITLE_KEY, title);
            requestMap.put(REQUEST_START_DATE_TIME_KEY, wrongStartDateTimeType);
            requestMap.put(REQUEST_END_DATE_KEY, correctEndDateTimeType);

            // when
            final ExtractableResponse<Response> wrongDateTimeTypeRequest = wrongDateTimeTypeRegisterScheduleRequest(teamPlaceId, requestMap);

            // then
            assertSoftly(softly -> {
                softly.assertThat(wrongDateTimeTypeRequest.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(wrongDateTimeTypeRequest.body().asString()).isEqualTo("DateTime 형식이 잘못되었습니다. 서버 관리자에게 문의해주세요.");
            });
        }

        @Test
        @DisplayName("없는 팀 플레이스 ID로 요청하면 실패한다.")
        void failNotExistTeamPlaceIdRequest() {
            // given
            final Long notExistTeamPlaceId = -1L;

            // when
            final ExtractableResponse<Response> notExistTeamPlaceIdRequest = registerScheduleRequest(notExistTeamPlaceId, Schedule1_N_Hour.REQUEST);

            // then
            assertSoftly(softly -> {
                softly.assertThat(notExistTeamPlaceIdRequest.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(notExistTeamPlaceIdRequest.body().asString()).isEqualTo("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
            });
        }

        private ExtractableResponse<Response> wrongDateTimeTypeRegisterScheduleRequest(final Long teamPlaceId, final Map<String, String> requestMap) throws JsonProcessingException {
            return RestAssured.given().log().all()
                    .header("Authorization", JWT_PREFIX + JWT_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON_VALUE)
                    .body(objectMapper.writeValueAsString(requestMap))
                    .post("/api/team-place/{teamPlaceId}/calendar/schedules", teamPlaceId)
                    .then().log().all()
                    .extract();
        }
    }

    private ExtractableResponse<Response> registerScheduleRequest(final Long teamPlaceId, final ScheduleRegisterRequest request) {
        return RestAssured.given().log().all()
                .header("Authorization", JWT_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
                .post("/api/team-place/{teamPlaceId}/calendar/schedules", teamPlaceId)
                .then().log().all()
                .extract();
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
