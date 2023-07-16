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
import static team.teamby.teambyteam.fixtures.ScheduleFixtures.팀플_1번_N시간_일정;

@SuppressWarnings("NonAsciiCharacters")

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
            final Long teamPlaceId = 팀플_1번_N시간_일정.TEAM_PLACE_ID;

            // when
            final ExtractableResponse<Response> 정상_일정_등록_요청 = 일정_등록_요청(teamPlaceId, 팀플_1번_N시간_일정.REQUEST);

            // then
            assertSoftly(softly -> {
                softly.assertThat(정상_일정_등록_요청.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(정상_일정_등록_요청.header(HttpHeaders.LOCATION)).contains("/api/team-place/" + teamPlaceId + "/calendar/schedules/");
            });
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "    "})
        @DisplayName("일정 제목이 빈 값인 요청이면 실패한다.")
        void failBlankTitleRequest(final String blankTitle) {
            // given
            final Long teamPlaceId = 팀플_1번_N시간_일정.TEAM_PLACE_ID;
            final ScheduleRegisterRequest request = new ScheduleRegisterRequest(blankTitle, 팀플_1번_N시간_일정.START_DATE_TIME, 팀플_1번_N시간_일정.END_DATE_TIME);

            // when
            final ExtractableResponse<Response> 일정_제목_빈_값_일정_등록_요청 = 일정_등록_요청(teamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(일정_제목_빈_값_일정_등록_요청.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(일정_제목_빈_값_일정_등록_요청.body().asString()).isEqualTo("제목은 빈 값일 수 없습니다.");
            });
        }

        @ParameterizedTest
        @ValueSource(strings = {"2023-07-12 10-00", "2023:07:12 10:00", "2023-07-1210:10", "2023:07:12 10-00", "2023-07-12 10:00:00"})
        @DisplayName("잘못된 날짜 형식 요청이면 실패한다.")
        void failWrongDateTimeTypeRequest(final String wrongStartDateTimeType) throws JsonProcessingException {
            // given
            final Long teamPlaceId = 팀플_1번_N시간_일정.TEAM_PLACE_ID;
            final String title = 팀플_1번_N시간_일정.TITLE;
            final String correctEndDateTimeType = "2023-07-12 18:00";

            final Map<String, String> requestMap = new HashMap<>();
            requestMap.put(REQUEST_TITLE_KEY, title);
            requestMap.put(REQUEST_START_DATE_TIME_KEY, wrongStartDateTimeType);
            requestMap.put(REQUEST_END_DATE_KEY, correctEndDateTimeType);

            // when
            final ExtractableResponse<Response> 잘못된_날짜_형식_일정_등록_요청 = 잘못된_날짜_형식_일정_등록_요청(teamPlaceId, requestMap);

            // then
            assertSoftly(softly -> {
                softly.assertThat(잘못된_날짜_형식_일정_등록_요청.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(잘못된_날짜_형식_일정_등록_요청.body().asString()).isEqualTo("DateTime 형식이 잘못되었습니다. 서버 관리자에게 문의해주세요.");
            });
        }

        @Test
        @DisplayName("없는 팀 플레이스 ID로 요청하면 실패한다.")
        void failNotExistTeamPlaceIdRequest() {
            // given
            final Long notExistTeamPlaceId = -1L;

            // when
            final ExtractableResponse<Response> 없는_팀_플레이스_ID_일정_등록_요청 = 일정_등록_요청(notExistTeamPlaceId, 팀플_1번_N시간_일정.REQUEST);

            // then
            assertSoftly(softly -> {
                softly.assertThat(없는_팀_플레이스_ID_일정_등록_요청.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(없는_팀_플레이스_ID_일정_등록_요청.body().asString()).isEqualTo("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
            });
        }

        private ExtractableResponse<Response> 잘못된_날짜_형식_일정_등록_요청(final Long teamPlaceId, final Map<String, String> requestMap) throws JsonProcessingException {
            return RestAssured.given().log().all()
                    .header("Authorization", JWT_PREFIX + JWT_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON_VALUE)
                    .body(objectMapper.writeValueAsString(requestMap))
                    .post("/api/team-place/{teamPlaceId}/calendar/schedules", teamPlaceId)
                    .then().log().all()
                    .extract();
        }
    }


    private ExtractableResponse<Response> 일정_등록_요청(final Long teamPlaceId, final ScheduleRegisterRequest request) {
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
