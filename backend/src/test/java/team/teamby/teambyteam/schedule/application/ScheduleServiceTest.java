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

@SuppressWarnings("NonAsciiCharacters")
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
            ScheduleRegisterRequest request = ScheduleFixtures.팀플_1번_N시간_일정.REQUEST;

            // when
            Long registeredId = scheduleService.register(request, teamPlaceId);

            // then
            Assertions.assertThat(registeredId).isNotNull();
        }

        @Test
        @DisplayName("일정 등록 시 Span 순서가 맞지 않으면 예외가 발생한다.")
        void failSpanWrongOrder() {
            // given
            String title = ScheduleFixtures.팀플_1번_N시간_일정.TITLE;
            Long teamPlaceId = ScheduleFixtures.팀플_1번_N시간_일정.TEAM_PLACE_ID;
            LocalDateTime startDateTime = ScheduleFixtures.팀플_1번_N시간_일정.START_DATE_TIME;
            LocalDateTime wrongEndDateTime = ScheduleFixtures.팀플_1번_N시간_일정.START_DATE_TIME.minusDays(1);
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
            ScheduleRegisterRequest request = ScheduleFixtures.팀플_1번_N시간_일정.REQUEST;
            Long notExistTeamPlaceId = -1L;

            // when & then
            assertThatThrownBy(() -> scheduleService.register(request, notExistTeamPlaceId))
                    .isInstanceOf(TeamPlaceException.NotFoundException.class)
                    .hasMessage("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
        }
    }
}
