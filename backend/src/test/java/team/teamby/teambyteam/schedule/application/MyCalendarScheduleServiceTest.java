package team.teamby.teambyteam.schedule.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.schedule.application.dto.ScheduleWithTeamPlaceIdResponse;
import team.teamby.teambyteam.schedule.application.dto.SchedulesWithTeamPlaceIdResponse;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.MemberFixtures.PHILIP;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_6_AND_MONTH_7_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;

public class MyCalendarScheduleServiceTest extends ServiceTest {

    @Autowired
    private MyCalendarScheduleService myCalendarScheduleService;

    @Nested
    @DisplayName("내 캘린더 정보 조회 시")
    class FindScheduleInMyCalendar {

        @Test
        @DisplayName("내 캘린더 정보 조회를 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, JAPANESE_TEAM_PLACE);

            final List<Schedule> expectedSchedules = List.of(
                    MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()),
                    MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(JAPANESE_TEAM_PLACE.getId())
            );
            testFixtureBuilder.buildSchedules(expectedSchedules);

            final MemberEmailDto memberEmailDto = new MemberEmailDto(PHILIP.getEmail().getValue());
            final int year = 2023;
            final int month = 7;

            // when
            final SchedulesWithTeamPlaceIdResponse scheduleInPeriod = myCalendarScheduleService.findScheduleInPeriod(memberEmailDto, year, month);
            final List<ScheduleWithTeamPlaceIdResponse> scheduleResponses = scheduleInPeriod.schedules();

            //then
            assertSoftly(softly -> {
                softly.assertThat(scheduleResponses).hasSize(2);
                softly.assertThat(scheduleResponses.get(0).title()).isEqualTo(expectedSchedules.get(0).getTitle().getValue());
                softly.assertThat(scheduleResponses.get(1).title()).isEqualTo(expectedSchedules.get(1).getTitle().getValue());
            });
        }
    }

    @Nested
    @DisplayName("내 캘린더 하루 일정 조회 시")
    class FindDailyScheduleInMyCalendar {

        @Test
        @DisplayName("일정이 있을 시 내 캘린더 하루 일정 조회를 성공한다.")
        void success() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());

            testFixtureBuilder.buildMemberTeamPlace(PHILIP, ENGLISH_TEAM_PLACE);
            testFixtureBuilder.buildMemberTeamPlace(PHILIP, JAPANESE_TEAM_PLACE);

            final List<Schedule> expectedSchedules = List.of(
                    MONTH_6_AND_MONTH_7_SCHEDULE(JAPANESE_TEAM_PLACE.getId()),
                    MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE(ENGLISH_TEAM_PLACE.getId()),
                    MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()),
                    MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(JAPANESE_TEAM_PLACE.getId())
            );
            testFixtureBuilder.buildSchedules(expectedSchedules);

            final MemberEmailDto memberEmailDto = new MemberEmailDto(PHILIP.getEmail().getValue());
            final int year = 2023;
            final int month = 7;
            final int day = 12;

            // when
            final SchedulesWithTeamPlaceIdResponse dailyScheduleResponse =
                    myCalendarScheduleService.findScheduleInPeriod(memberEmailDto, year, month, day);
            final List<ScheduleWithTeamPlaceIdResponse> dailySchedules = dailyScheduleResponse.schedules();

            // then
            assertSoftly(softly -> {
                softly.assertThat(dailySchedules).hasSize(4);
                softly.assertThat(dailySchedules.get(0).title()).isEqualTo(expectedSchedules.get(0).getTitle().getValue());
                softly.assertThat(dailySchedules.get(1).title()).isEqualTo(expectedSchedules.get(1).getTitle().getValue());
                softly.assertThat(dailySchedules.get(2).title()).isEqualTo(expectedSchedules.get(2).getTitle().getValue());
                softly.assertThat(dailySchedules.get(3).title()).isEqualTo(expectedSchedules.get(3).getTitle().getValue());
            });
        }

        @Test
        @DisplayName("일정이 없을 시 빈 배열이 반환된다.")
        void successEmptyList() {
            // given
            final Member PHILIP = testFixtureBuilder.buildMember(PHILIP());
            final MemberEmailDto memberEmailDto = new MemberEmailDto(PHILIP.getEmail().getValue());
            final int year = 2023;
            final int month = 7;
            final int day = 12;

            // when
            final SchedulesWithTeamPlaceIdResponse dailyScheduleResponse =
                    myCalendarScheduleService.findScheduleInPeriod(memberEmailDto, year, month, day);

            // then
            assertThat(dailyScheduleResponse.schedules()).hasSize(0);
        }
    }
}
