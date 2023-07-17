package team.teamby.teambyteam.schedule.application;

import org.assertj.core.api.Assertions;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleResponse;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.schedule.exception.ScheduleException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static team.teamby.teambyteam.fixtures.ScheduleFixtures.Schedule1_N_Hour;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Transactional
@Sql({"/h2-reset-pk.sql", "/h2-data.sql"})
class ScheduleServiceTest {

    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Nested
    @DisplayName("일정 정보 조회시")
    class FindSchedule {

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

    @Nested
    @DisplayName("일정 등록 시")
    class RegisterSchedule {

        @Test
        @DisplayName("일정 등록에 성공한다.")
        void success() {
            // given
            final Long teamPlaceId = 1L;
            final ScheduleRegisterRequest request = ScheduleFixtures.Schedule1_N_Hour.REQUEST;

            // when
            final Long registeredId = scheduleService.register(request, teamPlaceId);

            // then
            Assertions.assertThat(registeredId).isNotNull();
        }

        @Test
        @DisplayName("일정 등록 시 Span 순서가 맞지 않으면 예외가 발생한다.")
        void failSpanWrongOrder() {
            // given
            final String title = ScheduleFixtures.Schedule1_N_Hour.TITLE;
            final Long teamPlaceId = ScheduleFixtures.Schedule1_N_Hour.TEAM_PLACE_ID;
            final LocalDateTime startDateTime = ScheduleFixtures.Schedule1_N_Hour.START_DATE_TIME;
            final LocalDateTime wrongEndDateTime = ScheduleFixtures.Schedule1_N_Hour.START_DATE_TIME.minusDays(1);
            final ScheduleRegisterRequest request = new ScheduleRegisterRequest(title, startDateTime, wrongEndDateTime);

            // when & then
            assertThatThrownBy(() -> scheduleService.register(request, teamPlaceId))
                    .isInstanceOf(ScheduleException.SpanWrongOrderException.class)
                    .hasMessage("시작 일자가 종료 일자보다 이후일 수 없습니다.");
        }

        @Test
        @DisplayName("일정 등록 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistById() {
            // given
            final ScheduleRegisterRequest request = ScheduleFixtures.Schedule1_N_Hour.REQUEST;
            final Long notExistTeamPlaceId = -1L;

            // when & then
            assertThatThrownBy(() -> scheduleService.register(request, notExistTeamPlaceId))
                    .isInstanceOf(TeamPlaceException.NotFoundException.class)
                    .hasMessage("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
        }
    }
}
