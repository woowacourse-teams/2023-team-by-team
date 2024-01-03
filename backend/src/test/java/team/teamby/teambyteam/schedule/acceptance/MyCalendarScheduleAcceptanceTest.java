package team.teamby.teambyteam.schedule.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.schedule.application.dto.ScheduleWithTeamPlaceIdResponse;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.*;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.acceptance.MyCalendarScheduleAcceptanceFixtures.FIND_DAILY_SCHEDULE_REQUEST;
import static team.teamby.teambyteam.common.fixtures.acceptance.MyCalendarScheduleAcceptanceFixtures.FIND_PERIOD_SCHEDULE_REQUEST;

public class MyCalendarScheduleAcceptanceTest extends AcceptanceTest {

    @Nested
    @DisplayName("내 캘린더 일정 조회를 한다")
    class MyCalendarFindSchedule {

        @Test
        @DisplayName("기간으로 조회 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());

            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, JAPANESE_TEAM_PLACE);

            final Schedule MONTH_7_AND_DAY_12_ALL_DAY_ENGLISH_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_JAPANESE_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));

            final int year = 2023;
            final int month = 7;

            // when
            final ExtractableResponse<Response> response = FIND_PERIOD_SCHEDULE_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), year, month);
            final List<ScheduleWithTeamPlaceIdResponse> schedules = response.jsonPath().getList("schedules", ScheduleWithTeamPlaceIdResponse.class);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(schedules).hasSize(2);
                softly.assertThat(schedules.get(0).title()).isEqualTo(MONTH_7_AND_DAY_12_ALL_DAY_ENGLISH_SCHEDULE.getTitle().getValue());
                softly.assertThat(schedules.get(1).title()).isEqualTo(MONTH_7_AND_DAY_12_N_HOUR_JAPANESE_SCHEDULE.getTitle().getValue());
            });
        }
    }

    @Nested
    @DisplayName("내 캘린더 하루 일정 조회 시")
    class MyCalendarFindDailySchedule {

        @Test
        @DisplayName("하루 일정 조회를 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());

            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, JAPANESE_TEAM_PLACE);

            final Schedule MONTH_7_AND_DAY_12_ALL_DAY_ENGLISH_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_JAPANESE_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));
            final Schedule MONTH_6_AND_MONTH_7_DAY_12_ENGLISH_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_6_AND_MONTH_7_JPANESE_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_6_AND_MONTH_7_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));

            final int year = 2023;
            final int month = 7;
            final int day = 12;

            // when
            final ExtractableResponse<Response> response = FIND_DAILY_SCHEDULE_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), year, month, day);
            final List<ScheduleWithTeamPlaceIdResponse> schedules = response.jsonPath().getList("schedules", ScheduleWithTeamPlaceIdResponse.class);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(schedules).hasSize(4);
                softly.assertThat(schedules.get(0).title()).isEqualTo(MONTH_6_AND_MONTH_7_JPANESE_SCHEDULE.getTitle().getValue());
                softly.assertThat(schedules.get(1).title()).isEqualTo(MONTH_6_AND_MONTH_7_DAY_12_ENGLISH_SCHEDULE.getTitle().getValue());
                softly.assertThat(schedules.get(2).title()).isEqualTo(MONTH_7_AND_DAY_12_ALL_DAY_ENGLISH_SCHEDULE.getTitle().getValue());
                softly.assertThat(schedules.get(3).title()).isEqualTo(MONTH_7_AND_DAY_12_N_HOUR_JAPANESE_SCHEDULE.getTitle().getValue());
            });
        }
    }



    @Nested
    @DisplayName("내 캘린더 일정을 특정 기간 사이에서 조회를 한다")
    class MyCalendarFindScheduleInSpecificPeriod {

        @Test
        @DisplayName("기간으로 조회 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());

            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, JAPANESE_TEAM_PLACE);

            final Schedule MONTH_6_AND_MONTH_7_DAY_12_ENGLISH_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_AND_DAY_12_ALL_DAY_ENGLISH_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_JAPANESE_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));
            final Schedule MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE_JAPANESE_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));

            final String startDate = "20230711";
            final String endDate = "20230712";

            // when
            final ExtractableResponse<Response> response = FIND_PERIOD_SCHEDULE_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), startDate, endDate);
            final List<ScheduleWithTeamPlaceIdResponse> schedules = response.jsonPath().getList("schedules", ScheduleWithTeamPlaceIdResponse.class);

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
                softly.assertThat(schedules).hasSize(3);
                softly.assertThat(schedules.get(0).title()).isEqualTo(MONTH_6_AND_MONTH_7_DAY_12_ENGLISH_SCHEDULE.getTitle().getValue());
                softly.assertThat(schedules.get(1).title()).isEqualTo(MONTH_7_AND_DAY_12_ALL_DAY_ENGLISH_SCHEDULE.getTitle().getValue());
                softly.assertThat(schedules.get(2).title()).isEqualTo(MONTH_7_AND_DAY_12_N_HOUR_JAPANESE_SCHEDULE.getTitle().getValue());
            });
        }

        @Test
        @DisplayName("날짜의 순서가 잘못되면 실패한다.")
        void failWithWrongPeriodDateOrder() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());

            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, JAPANESE_TEAM_PLACE);

            testFixtureBuilder.buildSchedule(MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));
            testFixtureBuilder.buildSchedule(MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));

            final String startDate = "20230711";
            final String endDate = "20230710";

            // when
            final ExtractableResponse<Response> response = FIND_PERIOD_SCHEDULE_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), startDate, endDate);
            final String errorMessage = response.jsonPath().get("error");

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(errorMessage).contains("시작 일자가 종료 일자보다 이후일 수 없습니다.");
            });
        }

        @Test
        @DisplayName("잘못된 형식으로 조회요청시 실패한다")
        void failWithWrongDateFormant() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());

            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, JAPANESE_TEAM_PLACE);

            testFixtureBuilder.buildSchedule(MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));
            testFixtureBuilder.buildSchedule(MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));

            final String startDate = "2023-07-11";
            final String endDate = "20230712";

            // when
            final ExtractableResponse<Response> response = FIND_PERIOD_SCHEDULE_REQUEST(jwtTokenProvider.generateAccessToken(PHILIP.getEmail().getValue()), startDate, endDate);
            final String errorMessage = response.jsonPath().get("error");

            //then
            assertSoftly(softly -> {
                softly.assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
                softly.assertThat(errorMessage).isEqualTo("잘못된 날짜 입력 형식입니다.");
            });
        }
    }
}
