package team.teamby.teambyteam.schedule.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.RepositoryTest;
import team.teamby.teambyteam.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.schedule.domain.vo.Title;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

public class ScheduleRepositoryTest extends RepositoryTest {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Test
    @DisplayName("특정 기간 내 팀플레이스 일정을 조회한다.")
    void findTeamPlaceScheduleInRange() {
        // given
        final Long teamPlaceId = 3L;
        final LocalDateTime firstDateTime = LocalDateTime.of(2023, 7, 1, 0, 0);
        final LocalDateTime endDateTime = LocalDateTime.of(2023, 8, 1, 0, 0);

        // when
        final List<Schedule> schedules = scheduleRepository.findAllByTeamPlaceIdAndPeriod(teamPlaceId, firstDateTime, endDateTime);

        //then
        assertSoftly(softly -> {
            softly.assertThat(schedules).hasSize(4);
            softly.assertThat(schedules.get(0).getTitle().getValue()).isEqualTo("3번 팀플 B");
            softly.assertThat(schedules.get(1).getTitle().getValue()).isEqualTo("3번 팀플 C");
            softly.assertThat(schedules.get(2).getTitle().getValue()).isEqualTo("3번 팀플 E");
            softly.assertThat(schedules.get(3).getTitle().getValue()).isEqualTo("3번 팀플 D");
        });
    }

    @Test
    @DisplayName("특정 기간 내 팀플레이스 일정을 조회한다.")
    void findMultipleTeamPlaceScheduleInRange() {
        // given
        final List<Long> teamPlaceId = List.of(2L, 3L);
        final LocalDateTime firstDateTime = LocalDateTime.of(2023, 6, 1, 0, 0);
        final LocalDateTime endDateTime = LocalDateTime.of(2023, 7, 1, 0, 0);

        // when
        final List<Schedule> schedules = scheduleRepository.findAllByTeamPlaceIdAndPeriod(teamPlaceId, firstDateTime, endDateTime);

        //then
        assertSoftly(softly -> {
            softly.assertThat(schedules).hasSize(5);
            softly.assertThat(schedules.get(0).getTitle().getValue()).isEqualTo("3번 팀플 6월 첫날");
            softly.assertThat(schedules.get(1).getTitle().getValue()).isEqualTo("2번 팀플 6월 첫날");
            softly.assertThat(schedules.get(2).getTitle().getValue()).isEqualTo("3번 팀플 A");
            softly.assertThat(schedules.get(3).getTitle().getValue()).isEqualTo("2번 팀플 6월 어느날");
            softly.assertThat(schedules.get(4).getTitle().getValue()).isEqualTo("3번 팀플 B");
        });
    }

    @Test
    @DisplayName("팀 캘린더 하루 일정을 조회한다.")
    void findDailyTeamCalendarSchedule() {
        // given
        final Long teamPlaceId = ScheduleFixtures.Schedule1_N_Hour.TEAM_PLACE_ID;
        final LocalDateTime startDateTime = LocalDateTime.of(2023, 7, 12, 0, 0, 0);
        final LocalDateTime endDateTime = LocalDateTime.of(2023, 7, 12, 23, 59, 59);

        // when
        final List<Schedule> schedules = scheduleRepository.findAllByTeamPlaceIdAndDailyPeriod(teamPlaceId, startDateTime, endDateTime);

        // then
        assertSoftly(softly -> {
            softly.assertThat(schedules).hasSize(2);
            softly.assertThat(schedules.stream().map(Schedule::getTitle).map(Title::getValue))
                    .containsExactly("1번 팀플 종일 일정", "1번 팀플 N시간 일정");
        });
    }

    @ParameterizedTest
    @CsvSource(value = {"-1:false", "1:true"}, delimiter = ':')
    @DisplayName("일정이 존재하면 true, 존재하지 않으면 false를 반환한다.")
    void isExistById(Long scheduleId, boolean expected) {
        // when
        final boolean actual = scheduleRepository.existsById(scheduleId);

        // then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DisplayName("일정이 있는 경우에 삭제가 되는지 확인한다.")
    void deleteById() {
        //given
        final long id = 1L;

        // when
        final boolean before = scheduleRepository.existsById(id);
        scheduleRepository.deleteById(id);
        final boolean after = scheduleRepository.existsById(id);

        // then
        assertThat(before).isTrue();
        assertThat(after).isFalse();
    }
}
