package team.teamby.teambyteam.schedule.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleResponse;
import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;
import team.teamby.teambyteam.schedule.application.dto.SchedulesResponse;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.schedule.exception.ScheduleDateFormatException;
import team.teamby.teambyteam.schedule.exception.ScheduleDescriptionLengthException;
import team.teamby.teambyteam.schedule.exception.ScheduleNotFoundException;
import team.teamby.teambyteam.schedule.exception.ScheduleSpanWrongOrderException;
import team.teamby.teambyteam.schedule.exception.TeamScheduleAccessException;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceNotFoundException;

import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.DATE_2023_07_12_00_00_00;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_5_FIRST_DAY_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_5_LAST_DAY_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_REGISTER_REQUEST;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_UPDATE_REQUEST;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_WITH_DESCRIPTION_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_DAY_29_AND_MONTH_8_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.JAPANESE_TEAM_PLACE;

public class TeamCalendarScheduleServiceTest extends ServiceTest {

    @Autowired
    private TeamCalendarScheduleService teamCalendarScheduleService;

    @Autowired
    private ScheduleRepository scheduleRepository;

    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    @Nested
    @DisplayName("팀 캘린더 일정 정보 조회시")
    class FindScheduleInTeamCalendar {

        @Test
        @DisplayName("특정 일정의 정보를 조회한다.")
        void findSpecificSchedule() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
            final String expectedStartDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime().format(dateTimeFormatter);
            final String expectedEndDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getEndDateTime().format(dateTimeFormatter);

            // when
            final ScheduleResponse scheduleResponse = teamCalendarScheduleService.findSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId(), ENGLISH_TEAM_PLACE_ID);

            //then
            assertSoftly(softly -> {
                softly.assertThat(scheduleResponse.title()).isEqualTo(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTitle().getValue());
                softly.assertThat(scheduleResponse.startDateTime()).isEqualTo(expectedStartDateTime);
                softly.assertThat(scheduleResponse.endDateTime()).isEqualTo(expectedEndDateTime);
            });
        }

        @Test
        @DisplayName("요청한 일정의 정보가 없으면 예외를 발생시킨다.")
        void failFindUnExistingSchedule() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Long wrongScheduleId = -1L;

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.findSchedule(wrongScheduleId, ENGLISH_TEAM_PLACE_ID))
                    .isInstanceOf(ScheduleNotFoundException.class)
                    .hasMessageContaining("조회한 일정이 존재하지 않습니다.");

        }

        @Test
        @DisplayName("요청한 정보가 팀의 일정이 아니면 예외를 발생시킨다.")
        void failFindOtherTeamPlaceSchedule() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final TeamPlace JAPANESE_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(JAPANESE_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Long JAPANESE_TEAM_PLACE_ID = JAPANESE_TEAM_PLACE.getId();

            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.findSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId(), JAPANESE_TEAM_PLACE_ID))
                    .isInstanceOf(TeamScheduleAccessException.class)
                    .hasMessageContaining("해당 팀플레이스에 일정을 조회할 권한이 없습니다.");
        }

        @Test
        @DisplayName("팀 캘린더에서 1달 내 일정들을 조회한다.")
        void findAllInMonthlyPeriod() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Schedule MONTH_6_AND_MONTH_7_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_DAY_29_AND_MONTH_8_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_DAY_29_AND_MONTH_8_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            final int year = 2023;
            final int month = 7;

            // when
            final SchedulesResponse schedulesResponse = teamCalendarScheduleService.findScheduleInMonth(ENGLISH_TEAM_PLACE.getId(), year, month);
            final List<ScheduleResponse> scheduleResponses = schedulesResponse.schedules();

            //then
            assertSoftly(softly -> {
                softly.assertThat(scheduleResponses).hasSize(4);
                softly.assertThat(scheduleResponses.get(0).title()).isEqualTo(MONTH_6_AND_MONTH_7_SCHEDULE.getTitle().getValue());
                softly.assertThat(scheduleResponses.get(1).title()).isEqualTo(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTitle().getValue());
                softly.assertThat(scheduleResponses.get(2).title()).isEqualTo(MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE.getTitle().getValue());
                softly.assertThat(scheduleResponses.get(3).title()).isEqualTo(MONTH_7_DAY_29_AND_MONTH_8_SCHEDULE.getTitle().getValue());
            });
        }

        @Test
        @DisplayName("팀 캘린더에서 입력된 기간내 일정들을 조회한다.")
        void findAllInSpecificPeriod() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Schedule MONTH_6_AND_MONTH_7_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_7_DAY_29_AND_MONTH_8_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_DAY_29_AND_MONTH_8_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            final String startDate = "20230712";
            final String endDate = "20230728";

            // when
            final SchedulesResponse schedulesResponse = teamCalendarScheduleService.findScheduleInPeriod(ENGLISH_TEAM_PLACE.getId(), startDate, endDate);
            final List<ScheduleResponse> scheduleResponses = schedulesResponse.schedules();

            //then
            assertSoftly(softly -> {
                softly.assertThat(scheduleResponses).hasSize(3);
                softly.assertThat(scheduleResponses.get(0).title()).isEqualTo(MONTH_6_AND_MONTH_7_SCHEDULE.getTitle().getValue());
                softly.assertThat(scheduleResponses.get(1).title()).isEqualTo(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTitle().getValue());
                softly.assertThat(scheduleResponses.get(2).title()).isEqualTo(MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE.getTitle().getValue());
            });
        }

        @ParameterizedTest
        @CsvSource(value = {"2023712,20230728", "20230712,0728"}, delimiter = ',')
        @DisplayName("특정기간 조회시 일정 포멧이 yyyyMMdd와 다르면 예외를 발생시킨다.")
        void failWithWrongDateFormat(final String startDate, final String endDate) {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());

            // when
            // then
            assertThatThrownBy(() -> teamCalendarScheduleService.findScheduleInPeriod(ENGLISH_TEAM_PLACE.getId(), startDate, endDate))
                    .isInstanceOf(ScheduleDateFormatException.class)
                    .hasMessage("잘못된 날짜 입력 형식입니다.");

        }

        @Test
        @DisplayName("팀 캘린더에서 일정이 없는 기간 내 일정들을 조회한다.")
        void findAllInPeriodWith0Schedule() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final int notExistYear = -1;
            final int month = 7;

            // when
            final SchedulesResponse schedulesResponse = teamCalendarScheduleService.findScheduleInMonth(ENGLISH_TEAM_PLACE.getId(), notExistYear, month);
            final List<ScheduleResponse> scheduleResponses = schedulesResponse.schedules();

            //then
            assertThat(scheduleResponses).hasSize(0);
        }

        @Test
        @DisplayName("첫날과 마지막날 일정이 정상적으로 조회 된다.")
        void firstAndLastDateScheduleFind() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Schedule MONTH_5_FIRST_DAY_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_5_FIRST_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            final Schedule MONTH_5_LAST_DAY_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_5_LAST_DAY_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            final int year = MONTH_5_FIRST_DAY_SCHEDULE.getSpan().getStartDateTime().getYear();
            final int month = MONTH_5_FIRST_DAY_SCHEDULE.getSpan().getStartDateTime().getMonthValue();

            // when
            final SchedulesResponse schedulesResponse = teamCalendarScheduleService.findScheduleInMonth(ENGLISH_TEAM_PLACE.getId(), year, month);
            final List<ScheduleResponse> scheduleResponses = schedulesResponse.schedules();

            //then
            assertSoftly(softly -> {
                softly.assertThat(scheduleResponses).hasSize(2);
                softly.assertThat(scheduleResponses.get(0).title()).isEqualTo(MONTH_5_FIRST_DAY_SCHEDULE.getTitle().getValue());
                softly.assertThat(scheduleResponses.get(1).title()).isEqualTo(MONTH_5_LAST_DAY_SCHEDULE.getTitle().getValue());
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
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
            final Schedule MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
            final Schedule MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE(ENGLISH_TEAM_PLACE_ID));

            final int year = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime().getYear();
            final int month = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime().getMonthValue();
            final int day = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime().getDayOfMonth();

            // when
            final SchedulesResponse dailySchedulesResponse =
                    teamCalendarScheduleService.findScheduleInDay(ENGLISH_TEAM_PLACE_ID, year, month, day);
            final List<ScheduleResponse> dailyTeamCalendarSchedulesResponses = dailySchedulesResponse.schedules();

            // then
            assertSoftly(softly -> {
                softly.assertThat(dailyTeamCalendarSchedulesResponses).hasSize(3);
                softly.assertThat(dailyTeamCalendarSchedulesResponses.stream()
                                .map(ScheduleResponse::title))
                        .containsExactly(
                                MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE.getTitle().getValue(),
                                MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE.getTitle().getValue(),
                                MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTitle().getValue()
                        );
            });
        }

        @Nested
        @DisplayName("날짜 형식이 잘못되면 예외가 발생한다.")
        class failWrongDateTimeType {

            @Test
            @DisplayName("잘못된 연도 형식일 경우 실패한다.")
            void wrongYear() {
                // given
                final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
                final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
                final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
                final int wrongYear = Integer.MAX_VALUE;
                final int month = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime().getMonthValue();
                final int day = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime().getDayOfMonth();

                // when & then
                assertThatThrownBy(() -> teamCalendarScheduleService.findScheduleInDay(ENGLISH_TEAM_PLACE_ID, wrongYear, month, day))
                        .isInstanceOf(DateTimeException.class)
                        .hasMessageContaining("Invalid value for Year (valid values -999999999 - 999999999)");
            }

            @Test
            @DisplayName("잘못된 월 형식일 경우 실패한다.")
            void wrongMonth() {
                // given
                final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
                final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
                final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
                final int year = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime().getYear();
                final int wrongMonth = -1;
                final int day = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime().getDayOfMonth();

                // when & then
                assertThatThrownBy(() -> teamCalendarScheduleService.findScheduleInDay(ENGLISH_TEAM_PLACE_ID, year, wrongMonth, day))
                        .isInstanceOf(DateTimeException.class)
                        .hasMessageContaining("Invalid value for MonthOfYear (valid values 1 - 12)");
            }

            @Test
            @DisplayName("잘못된 일 형식일 경우 실패한다.")
            void wrongDay() {
                // given
                final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
                final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
                final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
                final int year = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime().getYear();
                final int month = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime().getDayOfMonth();
                final int wrongDay = -1;

                // when & then
                assertThatThrownBy(() -> teamCalendarScheduleService.findScheduleInDay(ENGLISH_TEAM_PLACE_ID, year, month, wrongDay))
                        .isInstanceOf(DateTimeException.class)
                        .hasMessageContaining("Invalid value for DayOfMonth (valid values 1 - 28/31)");
            }
        }

        @Test
        @DisplayName("조회한 팀 캘린더 하루 일정이 없으면 빈 리스트가 반환된다.")
        void successNotExistSchedule() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final int year = -1;
            final int month = 1;
            final int day = 1;

            // when
            SchedulesResponse schedules = teamCalendarScheduleService.findScheduleInDay(ENGLISH_TEAM_PLACE.getId(), year, month, day);

            // then
            assertThat(schedules.schedules()).hasSize(0);
        }

        @Test
        @DisplayName("조회할 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExist() {
            // given
            final Long notExistTeamPlaceId = -1L;
            final int year = 2023;
            final int month = 1;
            final int day = 1;

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.findScheduleInDay(notExistTeamPlaceId, year, month, day))
                    .isInstanceOf(TeamPlaceNotFoundException.class)
                    .hasMessageContaining("조회한 팀 플레이스가 존재하지 않습니다.");
        }
    }

    @Nested
    @DisplayName("일정 등록 시")
    class RegisterSchedule {

        @Test
        @DisplayName("메모가 없는 일정 등록에 성공한다.")
        void success() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final ScheduleRegisterRequest request = ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_REGISTER_REQUEST;

            // when
            final Long registeredId = teamCalendarScheduleService.register(request, ENGLISH_TEAM_PLACE.getId());

            // then
            assertThat(registeredId).isNotNull();
        }

        @Test
        @DisplayName("메모가 있는 일정 등록에 성공한다.")
        void successWithDescription() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final ScheduleRegisterRequest request = ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_WITH_DESCRIPTION_REGISTER_REQUEST;

            // when
            final Long registeredId = teamCalendarScheduleService.register(request, ENGLISH_TEAM_PLACE.getId());

            // then
            assertThat(registeredId).isNotNull();
        }

        @Test
        @DisplayName("100자 초과의 메모 입력시 예외를 발생시킨다.")
        void failWithTooLongDescription() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final String testTitle = "test";
            final String testDescription = ".".repeat(101);
            final ScheduleRegisterRequest request = new ScheduleRegisterRequest(testTitle, testDescription, LocalDateTime.now(), LocalDateTime.now());

            // when
            // then
            assertThatThrownBy(() -> teamCalendarScheduleService.register(request, ENGLISH_TEAM_PLACE.getId()))
                    .isInstanceOf(ScheduleDescriptionLengthException.class)
                    .hasMessage("일정 메모가 너무 깁니다.");
        }

        @Test
        @DisplayName("일정 등록 시 Span 순서가 맞지 않으면 예외가 발생한다.")
        void failSpanWrongOrder() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId());
            final String title = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTitle().getValue();
            final LocalDateTime startDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime();
            final LocalDateTime wrongEndDateTime = startDateTime.minusDays(1);
            final ScheduleRegisterRequest request = new ScheduleRegisterRequest(title, startDateTime, wrongEndDateTime);

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.register(request, ENGLISH_TEAM_PLACE.getId()))
                    .isInstanceOf(ScheduleSpanWrongOrderException.class)
                    .hasMessageContaining("시작 일자가 종료 일자보다 이후일 수 없습니다.");
        }

        @Test
        @DisplayName("일정 등록 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistById() {
            // given
            final ScheduleRegisterRequest request = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_REGISTER_REQUEST;
            final Long notExistTeamPlaceId = -1L;

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.register(request, notExistTeamPlaceId))
                    .isInstanceOf(TeamPlaceNotFoundException.class)
                    .hasMessageContaining("조회한 팀 플레이스가 존재하지 않습니다.");
        }
    }

    @Nested
    @DisplayName("일정 수정 시")
    class UpdateSchedule {

        @Test
        @DisplayName("일정 수정에 성공한다.")
        void success() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
            final Long MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId();

            final LocalDateTime startTimeToUpdate = DATE_2023_07_12_00_00_00;
            final ScheduleUpdateRequest request = new ScheduleUpdateRequest(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE, startTimeToUpdate, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getEndDateTime());

            // when
            teamCalendarScheduleService.update(request, ENGLISH_TEAM_PLACE_ID, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID);
            final Schedule updatedSchedule = scheduleRepository.findById(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID).get();

            // then
            assertThat(updatedSchedule.getSpan().getStartDateTime()).isEqualTo(startTimeToUpdate);
        }

        @Test
        @DisplayName("일정의 description만 변경한다")
        void changeDescription() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_WITH_DESCRIPTION_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
            final Long MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId();

            final String newDescription = "new description";
            final ScheduleUpdateRequest request = new ScheduleUpdateRequest(null, newDescription, null, null);

            // when
            teamCalendarScheduleService.update(request, ENGLISH_TEAM_PLACE_ID, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID);
            final Schedule updatedSchedule = scheduleRepository.findById(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID).get();

            // then
            assertThat(updatedSchedule.getDescription().getValue()).isEqualTo(newDescription);
        }

        @Test
        @DisplayName("빈값을 입력해서 메모를 삭제한다.")
        void deleteDescriptionWithBlankValue() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_WITH_DESCRIPTION_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
            final Long MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId();

            final ScheduleUpdateRequest request = new ScheduleUpdateRequest(null, "", null, null);

            // when
            teamCalendarScheduleService.update(request, ENGLISH_TEAM_PLACE_ID, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID);
            final Schedule updatedSchedule = scheduleRepository.findById(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID).get();

            // then
            assertThat(updatedSchedule.getDescription().isExist()).isFalse();
        }

        @Test
        @DisplayName("일정의 title만 변경한다")
        void changeOnlyTitle() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_WITH_DESCRIPTION_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
            final Long MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId();

            final String newTitle = "new title";
            final ScheduleUpdateRequest request = new ScheduleUpdateRequest(newTitle, null, null, null);

            // when
            teamCalendarScheduleService.update(request, ENGLISH_TEAM_PLACE_ID, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID);
            final Schedule updatedSchedule = scheduleRepository.findById(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_ID).get();

            // then
            assertThat(updatedSchedule.getTitle().getValue()).isEqualTo(newTitle);
        }

        @Test
        @DisplayName("일정 수정 시 Span 순서가 맞지 않으면 예외가 발생한다.")
        void failSpanWrongOrder() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));

            String title = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getTitle().getValue();
            final LocalDateTime startDateTime = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getSpan().getStartDateTime();
            final LocalDateTime wrongEndDateTime = startDateTime.minusDays(1);
            final ScheduleUpdateRequest request = new ScheduleUpdateRequest(title, startDateTime, wrongEndDateTime);

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.update(request, ENGLISH_TEAM_PLACE_ID, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId()))
                    .isInstanceOf(ScheduleSpanWrongOrderException.class)
                    .hasMessageContaining("시작 일자가 종료 일자보다 이후일 수 없습니다.");
        }

        @Test
        @DisplayName("일정 수정 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistById() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));
            final ScheduleUpdateRequest request = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_UPDATE_REQUEST;
            final Long notExistTeamPlaceId = -1L;

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.update(request, notExistTeamPlaceId, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId()))
                    .isInstanceOf(TeamPlaceNotFoundException.class)
                    .hasMessageContaining("조회한 팀 플레이스가 존재하지 않습니다.");
        }

        @Test
        @DisplayName("일정 수정 시 수정할 일정 ID에 해당하는 일정이 존재하지 않으면 예외가 발생한다.")
        void failScheduleNotExistById() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long notExistScheduleId = -1L;
            final ScheduleUpdateRequest request = MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_UPDATE_REQUEST;

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.update(request, ENGLISH_TEAM_PLACE.getId(), notExistScheduleId))
                    .isInstanceOf(ScheduleNotFoundException.class)
                    .hasMessageContaining("조회한 일정이 존재하지 않습니다.");
        }
    }

    @Nested
    @DisplayName("일정 삭제 시")
    class DeleteSchedule {

        @Test
        @DisplayName("일정 삭제에 성공한다.")
        void success() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE_ID));

            // when
            teamCalendarScheduleService.delete(ENGLISH_TEAM_PLACE_ID, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId());

            // then
            assertThat(scheduleRepository.findById(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE.getId()).isEmpty()).isTrue();
        }

        @Test
        @DisplayName("일정 삭제 시 팀 플레이스 ID에 해당하는 팀 플레이스가 존재하지 않으면 예외가 발생한다.")
        void failTeamPlaceNotExistById() {
            // given
            final Long notExistTramPlaceId = -1L;
            final Long existScheduleId = 1L;

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.delete(notExistTramPlaceId, existScheduleId))
                    .isInstanceOf(TeamPlaceNotFoundException.class)
                    .hasMessageContaining("조회한 팀 플레이스가 존재하지 않습니다.");
        }

        @Test
        @DisplayName("일정 삭제 시 존재하지 않는 일정 Id면 실패한다.")
        void failScheduleNotExistById() {
            // given
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Long ENGLISH_TEAM_PLACE_ID = ENGLISH_TEAM_PLACE.getId();
            final Long notExistScheduleId = -1L;

            // when & then
            assertThatThrownBy(() -> teamCalendarScheduleService.delete(ENGLISH_TEAM_PLACE_ID, notExistScheduleId))
                    .isInstanceOf(ScheduleNotFoundException.class)
                    .hasMessageContaining("조회한 일정이 존재하지 않습니다.");
        }
    }
}
