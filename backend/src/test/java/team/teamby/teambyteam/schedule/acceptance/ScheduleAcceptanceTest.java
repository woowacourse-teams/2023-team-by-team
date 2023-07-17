package team.teamby.teambyteam.schedule.acceptance;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
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

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.fixtures.ScheduleFixtures.Schedule1_N_Hour;

public class ScheduleAcceptanceTest extends AcceptanceTest {

    private static final String JWT_PREFIX = "Bearer ";
    private static final String JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhYmNkQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.2Amns5eXoGSqLw5KW-i22lH3S85-wfNd3j6Zs2z2Fg4";
    private static final String REQUEST_TITLE_KEY = "title";
    private static final String REQUEST_START_DATE_TIME_KEY = "startDateTime";
    private static final String REQUEST_END_DATE_KEY = "endDateTime";

    @Autowired
    private ObjectMapper objectMapper;

    @Nested
    @DisplayName("일정 등록 시")
    class RegisterSchedule {

        @Test
        @DisplayName("일정 등록에 성공한다.")
        void success() {
            // given
            Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;

            // when
            ExtractableResponse<Response> successRequest = registerScheduleRequest(teamPlaceId, Schedule1_N_Hour.REQUEST);

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(successRequest.header(HttpHeaders.LOCATION)).contains("/api/team-place/" + teamPlaceId + "/calendar/schedules/");
            });
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "    "})
        @DisplayName("일정 제목이 빈 값인 요청이면 실패한다.")
        void failBlankTitleRequest(String blankTitle) {
            // given
            Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            ScheduleRegisterRequest request = new ScheduleRegisterRequest(blankTitle, Schedule1_N_Hour.START_DATE_TIME, Schedule1_N_Hour.END_DATE_TIME);

            // when
            ExtractableResponse<Response> blankTitleRequest = registerScheduleRequest(teamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(blankTitleRequest.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(blankTitleRequest.body().asString()).isEqualTo("제목은 빈 값일 수 없습니다.");
            });
        }

        @ParameterizedTest
        @ValueSource(strings = {"2023-07-12 10-00", "2023:07:12 10:00", "2023-07-1210:10", "2023:07:12 10-00", "2023-07-12 10:00:00"})
        @DisplayName("잘못된 날짜 형식 요청이면 실패한다.")
        void failWrongDateTimeTypeRequest(String wrongStartDateTimeType) throws JsonProcessingException {
            // given
            Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            String title = Schedule1_N_Hour.TITLE;
            String correctEndDateTimeType = "2023-07-12 18:00";

            Map<String, String> requestMap = new HashMap<>();
            requestMap.put(REQUEST_TITLE_KEY, title);
            requestMap.put(REQUEST_START_DATE_TIME_KEY, wrongStartDateTimeType);
            requestMap.put(REQUEST_END_DATE_KEY, correctEndDateTimeType);

            // when
            ExtractableResponse<Response> wrongDateTimeTypeRequest = wrongDateTimeTypeRegisterScheduleRequest(teamPlaceId, requestMap);

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
            Long notExistTeamPlaceId = -1L;

            // when
            ExtractableResponse<Response> notExistTeamPlaceIdRequest = registerScheduleRequest(notExistTeamPlaceId, Schedule1_N_Hour.REQUEST);

            // then
            assertSoftly(softly -> {
                softly.assertThat(notExistTeamPlaceIdRequest.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(notExistTeamPlaceIdRequest.body().asString()).isEqualTo("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
            });
        }

        private ExtractableResponse<Response> wrongDateTimeTypeRegisterScheduleRequest(final Long teamPlaceId, Map<String, String> requestMap) throws JsonProcessingException {
            return RestAssured.given().log().all()
                    .header("Authorization", JWT_PREFIX + JWT_TOKEN)
                    .contentType(MediaType.APPLICATION_JSON_VALUE)
                    .body(objectMapper.writeValueAsString(requestMap))
                    .post("/api/team-place/{teamPlaceId}/calendar/schedules", teamPlaceId)
                    .then().log().all()
                    .extract();
        }
    }

    private ExtractableResponse<Response> registerScheduleRequest(final Long teamPlaceId, ScheduleRegisterRequest request) {
        return RestAssured.given().log().all()
                .header("Authorization", JWT_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(request)
                .post("/api/team-place/{teamPlaceId}/calendar/schedules", teamPlaceId)
                .then().log().all()
                .extract();
    }
}
