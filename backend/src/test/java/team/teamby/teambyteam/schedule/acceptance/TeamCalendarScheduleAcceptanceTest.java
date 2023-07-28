package team.teamby.teambyteam.schedule.acceptance;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.Header;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.assertj.core.api.SoftAssertions;
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
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleResponse;
import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberTeamPlaceFixtures.PHILIP_ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.*;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.TeamCalendarScheduleAcceptanceFixtures.*;

public class TeamCalendarScheduleAcceptanceTest extends AcceptanceTest {

    @Autowired
    private ObjectMapper objectMapper;

    private static final String JWT_PREFIX = "Bearer ";
    private static final String REQUEST_TITLE_KEY = "title";
    private static final String REQUEST_START_DATE_TIME_KEY = "startDateTime";
    private static final String REQUEST_END_DATE_KEY = "endDateTime";

    @Nested
    @DisplayName("팀 캘린더 내 특정 일정 조회")
    class FindTeamPlaceSpecificSchedule {

        @Test
        @DisplayName("팀에서 아이디를 가지고 특정 일정을 조회한다.")
        public void getSpecificSchedule() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            // when
            final ExtractableResponse<Response> response = FIND_SPECIFIC_SCHEDULE_REQUEST(
                    jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId(), ENGLISH_TEAM_PLACE.getId()
            );

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(response.jsonPath().getString("title")).isEqualTo(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTitle().getValue());
                softly.assertThat(response.jsonPath().getString("startDateTime")).isEqualTo("2023-07-12 10:00");
                softly.assertThat(response.jsonPath().getString("endDateTime")).isEqualTo("2023-07-12 18:00");
            });
        }

        @Test
        @DisplayName("존재하지 않는 일정 조회시도시 실패한다.")
        void failGetScheduleWhichIsNotExist() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Long wrongScheduleId = -1L;

            // when
            final ExtractableResponse<Response> response = FIND_SPECIFIC_SCHEDULE_REQUEST(
                    jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), wrongScheduleId, ENGLISH_TEAM_PLACE.getId()
            );

            // then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(response.body().asString()).isEqualTo("조회한 일정이 존재하지 않습니다.");
            });
        }

        @Test
        @DisplayName("멤버가 소유하지 않은 팀플레이스의 특정 일정을 조회하면 실패한다.")
        void failMemberHasNotTeamPlaceSchedule() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));

            // when
            final ExtractableResponse<Response> response = FIND_SPECIFIC_SCHEDULE_REQUEST(
                    jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId(), JAPANESE_TEAM_PLACE.getId()
            );

            // then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
                softly.assertThat(response.body().asString()).isEqualTo("접근할 수 없는 팀플레이스입니다.");
            });
        }
    }

    @Nested
    @DisplayName("팀 캘린더 내 기간 일정 조회 시")
    class FindTeamCalendarScheduleInPeriod {

        @Test
        @DisplayName("기간으로 조회 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final List<Schedule> schedulesToSave = List.of(
                    MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId())
            );
            final List<Schedule> expectedSchedules = testFixtureBuilder.buildSchedules(schedulesToSave);

            final LocalDateTime startDateTime = expectedSchedules.get(0).getSpan().getStartDateTime();
            final int year = startDateTime.getYear();
            final int month = startDateTime.getMonthValue();

            // when
            final ExtractableResponse<Response> response = FIND_PERIOD_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), year, month);
            final List<ScheduleResponse> actualSchedules = response.jsonPath().getList("schedules", ScheduleResponse.class);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(actualSchedules.size()).isEqualTo(2);
                softly.assertThat(actualSchedules.get(0).title()).isEqualTo(expectedSchedules.get(0).getTitle().getValue());
                softly.assertThat(actualSchedules.get(1).title()).isEqualTo(expectedSchedules.get(1).getTitle().getValue());
            });
        }

        @Test
        @DisplayName("요청에 날짜 정보가 누락되면 조회에 실패한다.")
        void failWithMissingQuery() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final int month = 7;

            // when
            final ExtractableResponse<Response> response = FIND_PERIOD_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), null, month);

            //then
            assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        }

        @Test
        @DisplayName("기간 요쳥에 잘못된 형식으로 요쳥되면 조회에 실패한다.")
        void failWithWrongQuery() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final String year = "y2023";
            final int month = 7;

            // when
            final ExtractableResponse<Response> response = RestAssured.given().log().all()
                    .header(new Header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + jwtTokenProvider.generateToken(PHILIP.getEmail().getValue())))
                    .pathParam("teamPlaceId", ENGLISH_TEAM_PLACE.getId())
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
    @DisplayName("팀 캘린더 하루 일정 조회 시")
    class FindTeamCalendarDailySchedule {

        @Test
        @DisplayName("팀 캘린더 하루 일정 조회에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final List<Schedule> schedulesToSave = List.of(MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(
                    ENGLISH_TEAM_PLACE.getId()), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId())
            );
            final List<Schedule> expectedSchedules = testFixtureBuilder.buildSchedules(schedulesToSave);

            final int year = 2023;
            final int month = 7;
            final int day = 12;

            // when
            final ExtractableResponse<Response> response = FIND_DAILY_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), year, month, day);
            final List<ScheduleResponse> schedules = response.jsonPath().getList("schedules", ScheduleResponse.class);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(schedules.stream()
                                .map(ScheduleResponse::title))
                        .containsExactly(expectedSchedules.get(0).getTitle().getValue(), expectedSchedules.get(1).getTitle().getValue());
            });
        }

        @Test
        @DisplayName("조회한 팀 캘린더 하루 일정이 없으면 빈 리스트가 반환된다.")
        void successNotExistSchedule() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final int year = 1000;
            final int month = 1;
            final int day = 1;

            // when
            final ExtractableResponse<Response> response = FIND_DAILY_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), year, month, day);
            final List<ScheduleResponse> schedules = response.jsonPath().getList("schedules", ScheduleResponse.class);

            // then
            assertThat(schedules).hasSize(0);
        }

        @Test
        @DisplayName("조회할 팀 플레이스가 존재하지 않으면 조회에 실패한다.")
        void failTeamPlaceNotExist() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final Long notExistTeamPlaceId = -1L;
            final int year = 2023;
            final int month = 7;
            final int day = 12;

            // when
            final ExtractableResponse<Response> response = FIND_DAILY_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), notExistTeamPlaceId, year, month, day);

            // then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(response.body().asString()).isEqualTo("조회한 팀 플레이스가 존재하지 않습니다.");
            });
        }
    }

    @Nested
    @DisplayName("기간 요쳥에 잘못된 형식으로 요쳥되면 조회에 실패한다.")
    class failWithWrongDateTimeType {

        @Test
        @DisplayName("잘못된 연도 형식일 경우 실패한다.")
        void wrongYear() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final int wrongYear = Integer.MAX_VALUE;
            final int month = 7;
            final int day = 12;

            // when
            ExtractableResponse<Response> wrongDayResponse = FIND_DAILY_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), wrongYear, month, day);

            // then
            assertSoftly(softly -> {
                softly.assertThat(wrongDayResponse.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(wrongDayResponse.body().asString()).isEqualTo("DateTime 형식이 잘못되었습니다. 서버 관리자에게 문의해주세요.");
            });
        }

        @Test
        @DisplayName("잘못된 월 형식일 경우 실패한다.")
        void wrongMonth() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final int year = 2023;
            final int wrongMonth = -1;
            final int day = 12;

            // when
            ExtractableResponse<Response> wrongDayResponse = FIND_DAILY_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), year, wrongMonth, day);

            // then
            assertSoftly(softly -> {
                softly.assertThat(wrongDayResponse.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(wrongDayResponse.body().asString()).isEqualTo("DateTime 형식이 잘못되었습니다. 서버 관리자에게 문의해주세요.");
            });
        }

        @Test
        @DisplayName("잘못된 일 형식일 경우 실패한다.")
        void wrongDay() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final int year = 2023;
            final int month = 7;
            final int wrongDay = -1;

            // when
            ExtractableResponse<Response> wrongDayResponse = FIND_DAILY_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), year, month, wrongDay);

            // then
            assertSoftly(softly -> {
                softly.assertThat(wrongDayResponse.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(wrongDayResponse.body().asString()).isEqualTo("DateTime 형식이 잘못되었습니다. 서버 관리자에게 문의해주세요.");
            });
        }
    }

    @Nested
    @DisplayName("일정 등록 시")
    class RegisterSchedule {

        @Test
        @DisplayName("일정 등록에 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            // when
            final ExtractableResponse<Response> successRequest = REGISTER_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_REGISTER_REQUEST);

            // then
            assertSoftly(softly -> {
                softly.assertThat(successRequest.statusCode()).isEqualTo(HttpStatus.CREATED.value());
                softly.assertThat(successRequest.header(HttpHeaders.LOCATION)).contains("/api/team-place/" + ENGLISH_TEAM_PLACE.getId() + "/calendar/schedules/");
            });
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "    "})
        @DisplayName("일정 제목이 빈 값인 요청이면 실패한다.")
        void failBlankTitleRequest(final String blankTitle) {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId());
            LocalDateTime startDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime();
            LocalDateTime endDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getEndDateTime();

            final ScheduleRegisterRequest request = new ScheduleRegisterRequest(blankTitle, startDateTime, endDateTime);

            // when
            final ExtractableResponse<Response> blankTitleRequest = REGISTER_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), request);

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
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final String correctEndDateTimeType = "2023-07-12 18:00";

            final Map<String, String> requestMap = new HashMap<>();
            requestMap.put(REQUEST_TITLE_KEY, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE);
            requestMap.put(REQUEST_START_DATE_TIME_KEY, wrongStartDateTimeType);
            requestMap.put(REQUEST_END_DATE_KEY, correctEndDateTimeType);

            // when
            final ExtractableResponse<Response> wrongDateTimeTypeRequest = wrongDateTimeTypeRegisterScheduleRequest(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), requestMap);

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
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);

            final String title = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE;
            final LocalDateTime startDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()).getSpan().getStartDateTime();
            final LocalDateTime wrongEndDateTime = startDateTime.minusDays(1);
            final ScheduleRegisterRequest request = new ScheduleRegisterRequest(title, startDateTime, wrongEndDateTime);

            // when & then
            final ExtractableResponse<Response> wrongSpanOrderResponse = REGISTER_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), request);

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
            Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final Long notExistTeamPlaceId = -1L;

            // when
            final ExtractableResponse<Response> notExistTeamPlaceIdRequest = REGISTER_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), notExistTeamPlaceId, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_REGISTER_REQUEST);

            // then
            assertSoftly(softly -> {
                softly.assertThat(notExistTeamPlaceIdRequest.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(notExistTeamPlaceIdRequest.body().asString()).isEqualTo("조회한 팀 플레이스가 존재하지 않습니다.");
            });
        }

        private ExtractableResponse<Response> wrongDateTimeTypeRegisterScheduleRequest(final String token, final Long teamPlaceId, final Map<String, String> requestMap) throws JsonProcessingException {
            return RestAssured.given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token)
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
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            final ScheduleUpdateRequest request = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_UPDATE_REQUEST;

            // when
            final ExtractableResponse<Response> updateScheduleResponse = UPDATE_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId(), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTeamPlaceId(), request);

            // then
            assertThat(updateScheduleResponse.statusCode()).isEqualTo(HttpStatus.OK.value());
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "    "})
        @DisplayName("일정 제목이 빈 값인 요청이면 실패한다.")
        void failBlankTitleRequest(final String blankTitle) {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final LocalDateTime startDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime();
            final LocalDateTime endDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getEndDateTime();

            final ScheduleUpdateRequest request = new ScheduleUpdateRequest(blankTitle, startDateTime, endDateTime);

            // when
            final ExtractableResponse<Response> blankTitleRequest = UPDATE_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId(), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTeamPlaceId(), request);

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
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final String correctEndDateTimeType = "2023-07-12 18:00";

            final Map<String, String> requestMap = new HashMap<>();
            requestMap.put(REQUEST_TITLE_KEY, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTitle().getValue());
            requestMap.put(REQUEST_START_DATE_TIME_KEY, wrongStartDateTimeType);
            requestMap.put(REQUEST_END_DATE_KEY, correctEndDateTimeType);

            // when
            final ExtractableResponse<Response> wrongDateTimeTypeRequest = wrongDateTimeTypeUpdateScheduleRequest(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), ENGLISH_TEAM_PLACE.getId(), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId(), requestMap);

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
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            ScheduleUpdateRequest request = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_UPDATE_REQUEST;
            final Long notExistTeamPlaceId = -1L;

            // when
            final ExtractableResponse<Response> notExistTeamPlaceIdRequest = UPDATE_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId(), notExistTeamPlaceId, request);

            // then
            assertSoftly(softly -> {
                softly.assertThat(notExistTeamPlaceIdRequest.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(notExistTeamPlaceIdRequest.body().asString()).isEqualTo("조회한 팀 플레이스가 존재하지 않습니다.");
            });
        }

        private ExtractableResponse<Response> wrongDateTimeTypeUpdateScheduleRequest(final String token, final Long teamPlaceId, final Long id, final Map<String, String> requestMap) throws JsonProcessingException {
            return RestAssured.given().log().all()
                    .header(HttpHeaders.AUTHORIZATION, JWT_PREFIX + token)
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
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            // when
            final ExtractableResponse<Response> deleteScheduleResponse = DELETE_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTeamPlaceId(), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId());

            // then
            assertThat(deleteScheduleResponse.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
        }

        @Test
        @DisplayName("없는 팀 플레이스의 ID로 요청하면 실패한다.")
        void failNotExistTeamPlaceIdRequest() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            final Long notExistTeamPlaceId = -1L;

            // when
            final ExtractableResponse<Response> notExistTeamPlaceIdDeleteScheduleResponse = DELETE_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), notExistTeamPlaceId, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId());

            // then
            assertSoftly(softly -> {
                softly.assertThat(notExistTeamPlaceIdDeleteScheduleResponse.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(notExistTeamPlaceIdDeleteScheduleResponse.body().asString()).isEqualTo("조회한 팀 플레이스가 존재하지 않습니다.");
            });
        }

        @Test
        @DisplayName("없는 팀 일정 ID로 요청하면 실패한다.")
        void failNotExistScheduleId() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            final Long notExistScheduleId = -1L;

            // when
            final ExtractableResponse<Response> notExistScheduleIdDeleteResponse = DELETE_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTeamPlaceId(), notExistScheduleId);

            // then
            assertSoftly(softly -> {
                softly.assertThat(notExistScheduleIdDeleteResponse.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
                softly.assertThat(notExistScheduleIdDeleteResponse.body().asString()).isEqualTo("조회한 일정이 존재하지 않습니다.");
            });
        }
    }
}

