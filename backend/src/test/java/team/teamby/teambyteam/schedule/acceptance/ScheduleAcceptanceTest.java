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
import team.teamby.teambyteam.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleResponse;
import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleWithTeamPlaceIdResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.fixtures.ScheduleFixtures.Schedule1_N_Hour;

public class ScheduleAcceptanceTest extends AcceptanceTest {

    @Autowired
    private ObjectMapper objectMapper;

    private static final String JWT_PREFIX = "Bearer ";
    private static final String JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhYmNkQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.pKIcISxHAsLfzJblY50592nruhvzFpds5Ck4acewrhM";
    private static final String REQUEST_TITLE_KEY = "title";
    private static final String REQUEST_START_DATE_TIME_KEY = "startDateTime";
    private static final String REQUEST_END_DATE_KEY = "endDateTime";

    @Nested
    @DisplayName("팀플레이스 내 특정 일정 조회")
    class FindTeamPlaceSpecificSchedule {

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

        @Test
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

        @Test
        @DisplayName("멤버가 소유하지 않은 팀플레이스의 특정 일정을 조회하면 실패한다.")
        void failMemberHasNotTeamPlaceSchedule() {
            // given
            final Long unParticipatedTeamPlaceId = 2L;
            final Long scheduleIdInTeamPlace = 7L;

            // when
            final ExtractableResponse<Response> response = requestSpecificSchedule(scheduleIdInTeamPlace, unParticipatedTeamPlaceId);

            // then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
        }
    }

    @Nested
    @DisplayName("팀플래이스 내 기간 일정 조회 시")
    class FindTeamPlaceScheduleInPeriod {

        @Test
        @DisplayName("기간으로 조회 성공한다.")
        void success() {
            // given
            final Long teamPlaceId = 3L;
            final int year = 2023;
            final int month = 7;

            // when
            final ExtractableResponse<Response> response = requestTeamPlaceSchedulesInPeriod(teamPlaceId, year, month);
            final List<ScheduleResponse> schedules = response.jsonPath().getList("schedules", ScheduleResponse.class);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(schedules.get(0).title()).isEqualTo("3번 팀플 B");
                softly.assertThat(schedules.get(1).title()).isEqualTo("3번 팀플 C");
                softly.assertThat(schedules.get(2).title()).isEqualTo("3번 팀플 E");
                softly.assertThat(schedules.get(3).title()).isEqualTo("3번 팀플 D");
            });
        }

        @Test
        @DisplayName("요청에 날짜 정보가 누락되면 조회에 실패한다.")
        void failWithMissingQuery() {
            // given
            final Long teamPlaceId = 3L;
            final int month = 7;

            // when
            final ExtractableResponse<Response> response = requestTeamPlaceSchedulesInPeriod(teamPlaceId, null, month);

            //then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        }

        @Test
        @DisplayName("기간 요쳥에 잘못된 형식으로 요쳥되면 조회에 실패한다.")
        void failWithWrongQuery() {
            // given
            final Long teamPlaceId = 3L;
            final String year = "y2023";
            final int month = 7;

            // when
            final ExtractableResponse<Response> response = RestAssured.given().log().all()
                    .header(new Header("Authorization", JWT_PREFIX + JWT_TOKEN))
                    .pathParam("teamPlaceId", teamPlaceId)
                    .queryParam("year", year)
                    .queryParam("month", month)
                    .when().log().all()
                    .get("/api/team-place/{teamPlaceId}/calendar/schedules")
                    .then().log().all()
                    .extract();

            //then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
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
        @DisplayName("시작 일자와 종료 일자의 순서가 맞지 않으면 실패한다.")
        void failSpanWrongOrder() {
            // given
            final String title = ScheduleFixtures.Schedule1_N_Hour.TITLE;
            final Long teamPlaceId = ScheduleFixtures.Schedule1_N_Hour.TEAM_PLACE_ID;
            final LocalDateTime startDateTime = ScheduleFixtures.Schedule1_N_Hour.START_DATE_TIME;
            final LocalDateTime wrongEndDateTime = ScheduleFixtures.Schedule1_N_Hour.START_DATE_TIME.minusDays(1);
            final ScheduleRegisterRequest request = new ScheduleRegisterRequest(title, startDateTime, wrongEndDateTime);

            // when & then
            final ExtractableResponse<Response> wrongSpanOrderResponse = registerScheduleRequest(teamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(wrongSpanOrderResponse.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(wrongSpanOrderResponse.body().asString()).isEqualTo("시작 일자가 종료 일자보다 이후일 수 없습니다.");
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

    @Nested
    @DisplayName("일정 수정 시")
    class UpdateSchedule {

        @Test
        @DisplayName("일정 수정에 성공한다.")
        void success() {
            // given
            Long id = Schedule1_N_Hour.ID;
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final ScheduleUpdateRequest request = Schedule1_N_Hour.UPDATE_REQUEST;

            // when
            final ExtractableResponse<Response> updateScheduleResponse = updateSchedule(id, teamPlaceId, request);

            // then
            assertThat(updateScheduleResponse.statusCode()).isEqualTo(HttpStatus.OK.value());
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "    "})
        @DisplayName("일정 제목이 빈 값인 요청이면 실패한다.")
        void failBlankTitleRequest(final String blankTitle) {
            // given
            final Long id = Schedule1_N_Hour.ID;
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final ScheduleUpdateRequest request = new ScheduleUpdateRequest(blankTitle, Schedule1_N_Hour.START_DATE_TIME, Schedule1_N_Hour.END_DATE_TIME);

            // when
            final ExtractableResponse<Response> blankTitleRequest = updateSchedule(id, teamPlaceId, request);

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
            final Long id = Schedule1_N_Hour.ID;
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final String title = Schedule1_N_Hour.TITLE;
            final String correctEndDateTimeType = "2023-07-12 18:00";

            final Map<String, String> requestMap = new HashMap<>();
            requestMap.put(REQUEST_TITLE_KEY, title);
            requestMap.put(REQUEST_START_DATE_TIME_KEY, wrongStartDateTimeType);
            requestMap.put(REQUEST_END_DATE_KEY, correctEndDateTimeType);

            // when
            final ExtractableResponse<Response> wrongDateTimeTypeRequest = wrongDateTimeTypeUpdateScheduleRequest(teamPlaceId, id, requestMap);

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
            final Long id = 1L;
            final Long notExistTeamPlaceId = -1L;
            ScheduleUpdateRequest request = Schedule1_N_Hour.UPDATE_REQUEST;

            // when
            final ExtractableResponse<Response> notExistTeamPlaceIdRequest = updateSchedule(id, notExistTeamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(notExistTeamPlaceIdRequest.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(notExistTeamPlaceIdRequest.body().asString()).isEqualTo("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
            });
        }

        private ExtractableResponse<Response> wrongDateTimeTypeUpdateScheduleRequest(final Long teamPlaceId, final Long id, final Map<String, String> requestMap) throws JsonProcessingException {
            return RestAssured.given().log().all()
                    .header("Authorization", JWT_PREFIX + JWT_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON_VALUE)
                    .body(objectMapper.writeValueAsString(requestMap))
                    .patch("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, id)
                    .then().log().all()
                    .extract();
        }
    }

    @Nested
    @DisplayName("일정 삭제 시")
    class DeleteSchedule {

        @Test
        @DisplayName("일정 삭제가 성공한다.")
        void success() {
            // given
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final Long scheduleId = Schedule1_N_Hour.ID;

            // when
            final ExtractableResponse<Response> deleteScheduleResponse = deleteSchedule(teamPlaceId, scheduleId);

            // then
            assertSoftly(softly -> {
                softly.assertThat(deleteScheduleResponse.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
            });
        }

        @Test
        @DisplayName("없는 팀 플레이스의 ID로 요청하면 실패한다.")
        void failNotExistTeamPlaceIdRequest() {
            // given
            final Long notExistTeamPlaceId = -1L;
            final Long existScheduleId = Schedule1_N_Hour.ID;

            // when
            final ExtractableResponse<Response> notExistTeamPlaceIdDeleteScheduleResponse = deleteSchedule(notExistTeamPlaceId, existScheduleId);

            // then
            assertSoftly(softly -> {
                softly.assertThat(notExistTeamPlaceIdDeleteScheduleResponse.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(notExistTeamPlaceIdDeleteScheduleResponse.body().asString()).isEqualTo("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
            });
        }

        @Test
        @DisplayName("없는 팀 일정 ID로 요청하면 실패한다.")
        void failNotExistScheduleId() {
            // given
            final Long existTeamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final Long notExistScheduleId = -1L;

            // when
            final ExtractableResponse<Response> notExistScheduleIdDeleteResponse = deleteSchedule(existTeamPlaceId, notExistScheduleId);

            // then
            assertSoftly(softly -> {
                softly.assertThat(notExistScheduleIdDeleteResponse.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(notExistScheduleIdDeleteResponse.body().asString()).isEqualTo("ID에 해당하는 일정을 찾을 수 없습니다.");
            });
        }
    }

    @Nested
    @DisplayName("개인 일정 조회를 한다")
    class MyCalendarFindSchedule {

        @Test
        @DisplayName("기간으로 조회 성공한다.")
        void success() {
            // given
            final int year = 2023;
            final int month = 6;

            // when
            final ExtractableResponse<Response> response = requestMySchedulesInPeriod(year, month);
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

    private ExtractableResponse<Response> requestTeamPlaceSchedulesInPeriod(final Long teamPlaceId, final Integer year, final Integer month) {
        return RestAssured.given().log().all()
                .header(new Header("Authorization", JWT_PREFIX + JWT_TOKEN))
                .pathParam("teamPlaceId", teamPlaceId)
                .queryParam("year", year)
                .queryParam("month", month)
                .when().log().all()
                .get("/api/team-place/{teamPlaceId}/calendar/schedules")
                .then().log().all()
                .extract();
    }

    private ExtractableResponse<Response> requestMySchedulesInPeriod(final Integer year, final Integer month) {
        return RestAssured.given().log().all()
                .header(new Header("Authorization", JWT_PREFIX + JWT_TOKEN))
                .queryParam("year", year)
                .queryParam("month", month)
                .when().log().all()
                .get("/api/my-calendar/schedules")
                .then().log().all()
                .extract();
    }

    private ExtractableResponse<Response> updateSchedule(final Long id, final Long teamPlaceId, final ScheduleUpdateRequest request) {
        return RestAssured.given().log().all()
                .header("Authorization", JWT_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
                .patch("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, id)
                .then().log().all()
                .extract();
    }

    private ExtractableResponse<Response> deleteSchedule(final Long teamPlaceId, final Long scheduleId) {
        return RestAssured.given().log().all()
                .header("Authorization", JWT_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .delete("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}", teamPlaceId, scheduleId)
                .then().log().all()
                .extract();
    }
}
