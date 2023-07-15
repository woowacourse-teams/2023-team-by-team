package team.teamby.teambyteam.schedule.application;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.schedule.application.dto.ScheduleResponse;
import team.teamby.teambyteam.schedule.exception.ScheduleException;


@SpringBootTest(webEnvironment = WebEnvironment.NONE)
@Transactional
@Sql({"classpath:/h2-reset-pk.sql", "classpath:/h2-data.sql"})
class ScheduleServiceTest {

    @Autowired
    private ScheduleService scheduleService;

    @Test
    @DisplayName("특정 일정의 정보를 조회한다.")
    void findSpecificSchedule() {
        // given
        final Long scheduleId = 1L;
        final Long teamPlaceId = 1L;

        // when
        final ScheduleResponse scheduleResponse = scheduleService.findSchedule(scheduleId, teamPlaceId);

        //then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(scheduleResponse.title()).isEqualTo("1번 팀플 N시간 일정");
            softly.assertThat(scheduleResponse.startDateTime()).isEqualTo("2023-07-12 10:00");
            softly.assertThat(scheduleResponse.endDateTime()).isEqualTo("2023-07-12 18:00");
        });
    }

    @Test
    @DisplayName("요청한 일정의 정보가 없으면 예외를 발생시킨다.")
    void failFindUnExistingSchedule() {
        // given
        final Long wrongScheduleId = 100L;
        final Long teamPlaceId = 1L;

        // when & then
        assertThatThrownBy(() -> scheduleService.findSchedule(wrongScheduleId, teamPlaceId))
                .isInstanceOf(ScheduleException.ScheduleNotFoundException.class)
                .hasMessage("조회한 일정이 존재하지 않습니다.");

    }

    @Test
    @DisplayName("요청한 정보가 팀의 일정이 아니면 예외를 발생시킨다.")
    void failFindOtherTeamPlaceSchedule() {
        // given
        final Long scheduleId = 1L;
        final Long otherTeamId = 2L;

        // when & then
        assertThatThrownBy(() -> scheduleService.findSchedule(scheduleId, otherTeamId))
                .isInstanceOf(ScheduleException.TeamAccessForbidden.class)
                .hasMessage("해당 팀플레이스에 일정을 조회할 권한이 없습니다.");
    }
}
