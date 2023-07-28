package team.teamby.teambyteam.schedule.domain;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.RepositoryTest;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.*;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;

public class ScheduleRepositoryTest extends RepositoryTest {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Test
    @DisplayName("특정 기간 내 팀플레이스 일정을 조회한다.")
    void findTeamPlaceScheduleInRange() {
        // given
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
        final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
        final List<Schedule> schedulesToSave = List.of(MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE_ID), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
        final List<Schedule> expectedSchedule = testFixtureBuilder.buildSchedules(schedulesToSave);

        final LocalDateTime firstDateTime = LocalDateTime.of(2023, 7, 1, 0, 0);
        final LocalDateTime endDateTime = LocalDateTime.of(2023, 8, 1, 0, 0);

        // when
        final List<Schedule> actualSchedules = scheduleRepository.findAllByTeamPlaceIdAndPeriod(ENGLISH_TEAM_PLACE_ID, firstDateTime, endDateTime);

        //then
        Assertions.assertThat(actualSchedules).usingRecursiveFieldByFieldElementComparator()
                .isEqualTo(expectedSchedule);
    }

    @Test
    @DisplayName("특정 기간 내 팀플레이스 일정을 조회한다.")
    void findMultipleTeamPlaceScheduleInRange() {
        // given
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
        final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());
        final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
        final Long JAPANESE_TEAM_PLACE_ID = JAPANESE_TEAM_PLACE.getId();

        List<Schedule> schedulesToSave = List.of(
                MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE_ID), MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID),
                MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE(JAPANESE_TEAM_PLACE_ID), MONTH_7_DAY_29_AND_MONTH_8_SCHEDULE(JAPANESE_TEAM_PLACE_ID)
        );
        List<Schedule> expectedSchedules = testFixtureBuilder.buildSchedules(schedulesToSave);

        final List<Long> teamPlaceId = List.of(ENGLISH_TEAM_PLACE_ID, JAPANESE_TEAM_PLACE_ID);
        final LocalDateTime firstDateTime = LocalDateTime.of(2023, 7, 1, 0, 0);
        final LocalDateTime endDateTime = LocalDateTime.of(2023, 8, 1, 0, 0);

        // when
        final List<Schedule> actualSchedules = scheduleRepository.findAllByTeamPlaceIdAndPeriod(teamPlaceId, firstDateTime, endDateTime);

        //then
        assertThat(actualSchedules).usingRecursiveFieldByFieldElementComparator()
                .isEqualTo(expectedSchedules);
    }

    @Test
    @DisplayName("팀 캘린더 하루 일정을 조회한다.")
    void findDailyTeamCalendarSchedule() {
        // given
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
        final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
        final List<Schedule> schedulesToSave = List.of(
                MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE(ENGLISH_TEAM_PLACE_ID),
                MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE_ID),
                MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID)
        );
        final List<Schedule> expectedSchedule = testFixtureBuilder.buildSchedules(schedulesToSave);

        final LocalDateTime startDateTime = LocalDateTime.of(2023, 7, 13, 0, 0, 0);
        final LocalDateTime endDateTime = LocalDateTime.of(2023, 7, 12, 0, 0, 0);

        // when
        final List<Schedule> actualSchedules = scheduleRepository.findAllByTeamPlaceIdAndDailyPeriod(ENGLISH_TEAM_PLACE_ID, startDateTime, endDateTime);

        // then
        Assertions.assertThat(actualSchedules).usingRecursiveFieldByFieldElementComparator()
                .isEqualTo(expectedSchedule);
    }

    @ParameterizedTest
    @CsvSource(value = {"-1:false", "1:true"}, delimiter = ':')
    @DisplayName("일정이 존재하면 true, 존재하지 않으면 false를 반환한다.")
    void isExistById(Long scheduleId, boolean expected) {
        // given
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
        final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
        testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));

        // when
        final boolean actual = scheduleRepository.existsById(scheduleId);

        // then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DisplayName("일정이 있는 경우에 삭제가 되는지 확인한다.")
    void deleteById() {
        //given
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
        final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
        testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));

        // when
        final boolean before = scheduleRepository.existsById(ENGLISH_TEAM_PLACE_ID);
        scheduleRepository.deleteById(ENGLISH_TEAM_PLACE_ID);
        final boolean after = scheduleRepository.existsById(ENGLISH_TEAM_PLACE_ID);

        // then
        assertThat(before).isTrue();
        assertThat(after).isFalse();
    }
}
