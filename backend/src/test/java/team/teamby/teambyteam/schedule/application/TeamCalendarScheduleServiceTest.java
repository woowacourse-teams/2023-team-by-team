package team.teamby.teambyteam.schedule.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleResponse;
import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;
import team.teamby.teambyteam.schedule.application.dto.SchedulesResponse;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.schedule.exception.ScheduleException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.fixtures.ScheduleFixtures.Schedule1_N_Hour;

public class TeamCalendarScheduleServiceTest extends ServiceTest {

    @Autowired
    private TeamCalendarScheduleService teamCalendarScheduleService;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Nested
    @DisplayName("팀 캘린더 일정 정보 조회시")
    class FindScheduleInTeamCalendar {

        @Test
        @DisplayName("특정 일정의 정보를 조회한다.")
        void findSpecificSchedule() {
            // given
            final Long scheduleId = 1L;
            final Long teamPlaceId = 1L;

            // when
            final ScheduleResponse scheduleResponse = teamCalendarScheduleService.findSchedule(scheduleId, teamPlaceId);

            //then
            assertSoftly(softly -> {
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
            assertThatThrownBy(() -> teamCalendarScheduleService.findSchedule(wrongScheduleId, teamPlaceId))
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
            assertThatThrownBy(() -> teamCalendarScheduleService.findSchedule(scheduleId, otherTeamId))
                    .isInstanceOf(ScheduleException.TeamAccessForbidden.class)
                    .hasMessage("해당 팀플레이스에 일정을 조회할 권한이 없습니다.");
        }

        @Test
        @DisplayName("팀 캘린더에서 특정 기간 내 일정들을 조회한다.")
        void findAllInPeriod() {
            // given
            final Long teamPlaceId = 3L;
            final int year = 2023;
            final int month = 7;

            // when
            final SchedulesResponse schedulesResponse = teamCalendarScheduleService.findScheduleInPeriod(teamPlaceId, year, month);
            final List<ScheduleResponse> scheduleResponses = schedulesResponse.schedules();

            //then
            assertSoftly(softly -> {
                softly.assertThat(scheduleResponses).hasSize(4);
                softly.assertThat(scheduleResponses.get(0).title()).isEqualTo("3번 팀플 B");
                softly.assertThat(scheduleResponses.get(1).title()).isEqualTo("3번 팀플 C");
                softly.assertThat(scheduleResponses.get(2).title()).isEqualTo("3번 팀플 E");
                softly.assertThat(scheduleResponses.get(3).title()).isEqualTo("3번 팀플 D");
            });
        }

        @Test
        @DisplayName("팀 캘린더에서 일정이 없는 기간 내 일정들을 조회한다.")
        void findAllInPeriodWith0Schedule() {
            // given
            final Long teamPlaceId = 3L;
            final int year = 1000;
            final int month = 7;

            // when
            final SchedulesResponse schedulesResponse = teamCalendarScheduleService.findScheduleInPeriod(teamPlaceId, year, month);
            final List<ScheduleResponse> scheduleResponses = schedulesResponse.schedules();

            //then
            assertThat(scheduleResponses).hasSize(0);
        }

        @Test
        @DisplayName("첫날과 마지막날 일정이 정상적으로 조회 된다.")
        void firstAndLastDateScheduleFind() {
            // given
            final Long teamPlaceId = 3L;
            final int year = 2023;
            final int month = 5;

            // when
            final SchedulesResponse schedulesResponse = teamCalendarScheduleService.findScheduleInPeriod(teamPlaceId, year, month);
            final List<ScheduleResponse> scheduleResponses = schedulesResponse.schedules();

            //then
            assertSoftly(softly -> {
                softly.assertThat(scheduleResponses).hasSize(2);
                softly.assertThat(scheduleResponses.get(0).title()).isEqualTo("3번 팀플 5월 첫날");
                softly.assertThat(scheduleResponses.get(1).title()).isEqualTo("3번 팀플 5월 마지막날");
            });
        }
    }
    
    @Nested
    @DisplayName("팀 캘린더 하루 일정 조회 시")
    class FindTeamCalendarDailySchedule {

        @Test
        @DisplayName("팀 캘린더 하루 일정 조회를 성공한다.")
        void success() {
            // given
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final int year = Schedule1_N_Hour.START_DATE_TIME.getYear();
            final int month = Schedule1_N_Hour.START_DATE_TIME.getMonthValue();
            final int day = Schedule1_N_Hour.START_DATE_TIME.getDayOfMonth();

            // when
            final SchedulesResponse dailySchedulesResponse =
                    teamCalendarScheduleService.findDailySchedule(teamPlaceId, year, month, day);
            final List<ScheduleResponse> dailyTeamCalendarSchedulesResponses = dailySchedulesResponse.schedules();

            // then
            assertSoftly(softly -> {
                softly.assertThat(dailyTeamCalendarSchedulesResponses).hasSize(2);
                softly.assertThat(dailyTeamCalendarSchedulesResponses.stream()
                        .map(ScheduleResponse::title))
                        .containsExactly("1번 팀플 종일 일정", "1번 팀플 N시간 일정");
            });
        }

        @Nested
        @DisplayName("날짜 형식이 잘못되면 예외가 발생한다.")
        class failWrongDateTimeType {

            @Test
            @DisplayName("잘못된 연도 형식일 경우 실패한다.")
            void wrongYear() {
                // given
                final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
                final int wrongYear = Integer.MAX_VALUE;
                final int month = 7;
                final int day = 12;

                // when & then
                assertThatThrownBy(() -> teamCalendarScheduleService.findDailySchedule(teamPlaceId, wrongYear, month, day))
                        .isInstanceOf(DateTimeException.class)
                        .hasMessageContaining("Invalid value for Year (valid values -999999999 - 999999999)");
            }

            @Test
            @DisplayName("잘못된 월 형식일 경우 실패한다.")
            void wrongMonth() {
                // given
                final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
                final int year = 2023;
                final int wrongMonth = -1;
                final int day = 12;

                // when & then
                assertThatThrownBy(() -> teamCalendarScheduleService.findDailySchedule(teamPlaceId, year, wrongMonth, day))
                        .isInstanceOf(DateTimeException.class)
                        .hasMessageContaining("Invalid value for MonthOfYear (valid values 1 - 12)");
            }

            @Test
            @DisplayName("잘못된 일 형식일 경우 실패한다.")
            void wrongDay() {
                // given
                final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
                final int year = 2023;
                final int month = 7;
                final int wrongDay = -1;

                // when & then
                assertThatThrownBy(() -> teamCalendarScheduleService.findDailySchedule(teamPlaceId, year, month, wrongDay))
                        .isInstanceOf(DateTimeException.class)
                        .hasMessageContaining("Invalid value for DayOfMonth (valid values 1 - 28/31)");
            }
        }

        @Test
        @DisplayName("조회한 팀 캘린더 하루 일정이 없으면 빈 리스트가 반환된다.")
        void successNotExistSchedule() {
            // given
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final int year = 1000;
            final int month = 1;
            final int day = 1;

            // when
            SchedulesResponse schedules = teamCalendarScheduleService.findDailySchedule(teamPlaceId, year, month, day);

            // then
            assertThat(schedules.schedules()).hasSize(0);
        }

        @Test
        @DisplayName("조회할 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExist() {
            // given
            final Long notExistTeamPlaceId = -1L;
            final int year = Schedule1_N_Hour.START_DATE_TIME.getYear();
            final int month = Schedule1_N_Hour.START_DATE_TIME.getMonthValue();
            final int day = Schedule1_N_Hour.START_DATE_TIME.getDayOfMonth();

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.findDailySchedule(notExistTeamPlaceId, year, month, day))
                    .isInstanceOf(TeamPlaceException.NotFoundException.class)
                    .hasMessage("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
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
            final Long registeredId = teamCalendarScheduleService.register(request, teamPlaceId);

            // then
            assertThat(registeredId).isNotNull();
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
            assertThatThrownBy(() -> teamCalendarScheduleService.register(request, teamPlaceId))
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
            assertThatThrownBy(() -> teamCalendarScheduleService.register(request, notExistTeamPlaceId))
                    .isInstanceOf(TeamPlaceException.NotFoundException.class)
                    .hasMessage("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
        }
    }

    @Nested
    @DisplayName("일정 수정 시")
    class UpdateSchedule {

        @Test
        @DisplayName("일정 수정에 성공한다.")
        void success() {
            // given
            final Long id = Schedule1_N_Hour.ID;
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final ScheduleUpdateRequest request = Schedule1_N_Hour.UPDATE_REQUEST;

            // when
            teamCalendarScheduleService.update(request, teamPlaceId, id);
            final Schedule updatedSchedule = scheduleRepository.findById(id).get();

            // then
            assertThat(updatedSchedule).usingRecursiveComparison()
                    .isEqualTo(Schedule1_N_Hour.UPDATE_ENTITY());
        }

        @ParameterizedTest
        @ValueSource(strings = {"", " ", "    "})
        @DisplayName("일정 수정 시 수정할 일정 제목이 빈 값이면 예외가 발생한다.")
        void failUpdateTitleBlank(String titleToUpdate) {
            // given
            final Long id = Schedule1_N_Hour.ID;
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final LocalDateTime startDateTime = Schedule1_N_Hour.START_DATE_TIME;
            final LocalDateTime endDateTime = Schedule1_N_Hour.END_DATE_TIME;
            final ScheduleUpdateRequest request = new ScheduleUpdateRequest(titleToUpdate, startDateTime, endDateTime);

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.update(request, teamPlaceId, id))
                    .isInstanceOf(ScheduleException.TitleBlankException.class)
                    .hasMessage("일정의 제목은 빈 칸일 수 없습니다.");
        }

        @Test
        @DisplayName("일정 수정 시 Span 순서가 맞지 않으면 예외가 발생한다.")
        void failSpanWrongOrder() {
            // given
            final Long id = Schedule1_N_Hour.ID;
            final String title = Schedule1_N_Hour.TITLE;
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final LocalDateTime startDateTime = Schedule1_N_Hour.START_DATE_TIME;
            final LocalDateTime wrongEndDateTime = Schedule1_N_Hour.START_DATE_TIME.minusDays(1);
            final ScheduleUpdateRequest request = new ScheduleUpdateRequest(title, startDateTime, wrongEndDateTime);

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.update(request, teamPlaceId, id))
                    .isInstanceOf(ScheduleException.SpanWrongOrderException.class)
                    .hasMessage("시작 일자가 종료 일자보다 이후일 수 없습니다.");
        }

        @Test
        @DisplayName("일정 수정 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistById() {
            // given
            final Long id = Schedule1_N_Hour.ID;
            final ScheduleUpdateRequest request = Schedule1_N_Hour.UPDATE_REQUEST;
            final Long notExistTeamPlaceId = -1L;

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.update(request, notExistTeamPlaceId, id))
                    .isInstanceOf(TeamPlaceException.NotFoundException.class)
                    .hasMessage("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
        }

        @Test
        @DisplayName("일정 수정 시 수정할 일정 ID에 해당하는 일정이 존재하지 않으면 예외가 발생한다.")
        void failScheduleNotExistById() {
            // given
            final Long notExistScheduleId = -1L;
            final Long teamPlaceId = Schedule1_N_Hour.TEAM_PLACE_ID;
            final ScheduleUpdateRequest request = Schedule1_N_Hour.UPDATE_REQUEST;

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.update(request, teamPlaceId, notExistScheduleId))
                    .isInstanceOf(ScheduleException.ScheduleNotFoundException.class)
                    .hasMessage("ID에 해당하는 일정을 찾을 수 없습니다.");
        }
    }

    @Nested
    @DisplayName("일정 삭제 시")
    class DeleteSchedule {

        @Test
        @DisplayName("일정 삭제에 성공한다.")
        void success() {
            // given
            final Long teamPlaceId = 1L;
            final ScheduleRegisterRequest request = ScheduleFixtures.Schedule1_N_Hour.REQUEST;

            // when
            final Long registeredId = teamCalendarScheduleService.register(request, teamPlaceId);

            // then
            assertThat(registeredId).isNotNull();
        }

        @Test
        @DisplayName("일정 등록 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistById() {
            // given
            final Long notExistTramPlaceId = -1L;
            final Long existScheduleId = 1L;

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.delete(notExistTramPlaceId, existScheduleId))
                    .isInstanceOf(TeamPlaceException.NotFoundException.class)
                    .hasMessage("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
        }

        @Test
        @DisplayName("일정 삭제 시 존재하지 않는 일정 Id면 실패한다.")
        void failScheduleNotExistById() {
            // given
            final Long existTramPlaceId = 1L;
            final Long notExistScheduleId = -1L;

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.delete(existTramPlaceId, notExistScheduleId))
                    .isInstanceOf(ScheduleException.ScheduleNotFoundException.class)
                    .hasMessage("ID에 해당하는 일정을 찾을 수 없습니다.");
        }
    }
}
