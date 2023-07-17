package team.teamby.teambyteam.schedule.application;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.exception.ScheduleException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Transactional
@Sql({"/h2-reset-pk.sql", "/h2-data.sql"})
class ScheduleServiceTest {

    @Autowired
    private ScheduleService scheduleService;

    @Nested
    @DisplayName("일정 등록 시")
    class RegisterSchedule {

        @Test
        @DisplayName("일정 등록에 성공한다.")
        void success() {
            // given
            Long teamPlaceId = 1L;
            ScheduleRegisterRequest request = ScheduleFixtures.Schedule1_N_Hour.REQUEST;

            // when
            Long registeredId = scheduleService.register(request, teamPlaceId);

            // then
            Assertions.assertThat(registeredId).isNotNull();
        }

        @Test
        @DisplayName("일정 등록 시 Span 순서가 맞지 않으면 예외가 발생한다.")
        void failSpanWrongOrder() {
            // given
            String title = ScheduleFixtures.Schedule1_N_Hour.TITLE;
            Long teamPlaceId = ScheduleFixtures.Schedule1_N_Hour.TEAM_PLACE_ID;
            LocalDateTime startDateTime = ScheduleFixtures.Schedule1_N_Hour.START_DATE_TIME;
            LocalDateTime wrongEndDateTime = ScheduleFixtures.Schedule1_N_Hour.START_DATE_TIME.minusDays(1);
            ScheduleRegisterRequest request = new ScheduleRegisterRequest(title, startDateTime, wrongEndDateTime);

            // when & then
            assertThatThrownBy(() -> scheduleService.register(request, teamPlaceId))
                    .isInstanceOf(ScheduleException.SpanWrongOrderException.class)
                    .hasMessage("시작 일자가 종료 일자보다 이후일 수 없습니다.");
        }

        @Test
        @DisplayName("일정 등록 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistById() {
            // given
            ScheduleRegisterRequest request = ScheduleFixtures.Schedule1_N_Hour.REQUEST;
            Long notExistTeamPlaceId = -1L;

            // when & then
            assertThatThrownBy(() -> scheduleService.register(request, notExistTeamPlaceId))
                    .isInstanceOf(TeamPlaceException.NotFoundException.class)
                    .hasMessage("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
        }
    }

    @Nested
    @DisplayName("일정 삭제 시")
    class DeleteSchedule {

        @Test
        @DisplayName("일정 삭제에 성공한다.")
        void success() {
            // given
            Long teamPlaceId = 1L;
            ScheduleRegisterRequest request = ScheduleFixtures.팀플_1번_N시간_일정.REQUEST;

            // when
            Long registeredId = scheduleService.register(request, teamPlaceId);

            // then
            Assertions.assertThat(registeredId).isNotNull();
        }

        @Test
        @DisplayName("일정 등록 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistById() {
            // given
            Long notExistTramPlaceId = -1L;
            Long existScheduleId = 1L;

            // when & then
            assertThatThrownBy(() -> scheduleService.delete(notExistTramPlaceId, existScheduleId))
                    .isInstanceOf(TeamPlaceException.NotFoundException.class)
                    .hasMessage("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
        }

        @Test
        @DisplayName("일정 삭제 시 존재하지 않는 일정 Id면 실패한다.")
        void failScheduleNotExistById() {
            // given
            Long existTramPlaceId = 1L;
            Long notExistScheduleId = -1L;

            // when & then
            assertThatThrownBy(() -> scheduleService.delete(existTramPlaceId, notExistScheduleId))
                    .isInstanceOf(ScheduleException.NotFoundException.class)
                    .hasMessage("ID에 해당하는 일정을 찾을 수 없습니다.");
        }
    }
}
