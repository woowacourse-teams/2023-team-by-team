package team.teamby.teambyteam.schedule.acceptance;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import team.teamby.teambyteam.common.AcceptanceTest;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.schedule.application.dto.ScheduleWithTeamPlaceIdResponse;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.MemberTeamPlaceFixtures.PHILIP_ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.MemberTeamPlaceFixtures.PHILIP_JAPANESE_TEAM_PLACE;
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

            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            final MemberTeamPlace PHILIP_JAPANESE_TEAM_PLACE = PHILIP_JAPANESE_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            PHILIP_JAPANESE_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, JAPANESE_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_JAPANESE_TEAM_PLACE);

            final Schedule MONTH_7_AND_DAY_12_ALL_DAY_ENGLISH_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_JAPANESE_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));

            final int year = 2023;
            final int month = 7;

            // when
            final ExtractableResponse<Response> response = FIND_PERIOD_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), year, month);
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

            final MemberTeamPlace PHILIP_ENGLISH_TEAM_PLACE = PHILIP_ENGLISH_TEAM_PLACE();
            final MemberTeamPlace PHILIP_JAPANESE_TEAM_PLACE = PHILIP_JAPANESE_TEAM_PLACE();
            PHILIP_ENGLISH_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            PHILIP_JAPANESE_TEAM_PLACE.setMemberAndTeamPlace(PHILIP, JAPANESE_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP_JAPANESE_TEAM_PLACE);

            final Schedule MONTH_7_AND_DAY_12_ALL_DAY_ENGLISH_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_JAPANESE_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));
            final Schedule MONTH_6_AND_MONTH_7_DAY_12_ENGLISH_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_6_AND_MONTH_7_JPANESE_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_6_AND_MONTH_7_SCHEDULE(JAPANESE_TEAM_PLACE.getId()));

            final int year = 2023;
            final int month = 7;
            final int day = 12;

            // when
            final ExtractableResponse<Response> response = FIND_DAILY_SCHEDULE_REQUEST(jwtTokenProvider.generateToken(PHILIP.getEmail().getValue()), year, month, day);
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
}
