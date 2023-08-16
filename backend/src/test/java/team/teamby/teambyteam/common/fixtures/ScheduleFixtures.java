package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;

import java.time.LocalDateTime;

public class ScheduleFixtures {

    /**
     * SCHEDULE
     */
    public static final String MONTH_5_FIRST_DAY_SCHEDULE_TITLE = "5월 첫 날 일정";
    public static final String MONTH_5_LAST_DAY_SCHEDULE_TITLE = "5월 마지막 날 일정";
    public static final String MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE_TITLE = "6월~7월 12일 일정";
    public static final String MONTH_6_AND_MONTH_7_SCHEDULE_TITLE = "6월~7월 일정";
    public static final String MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE = "7월 12일 N시간 일정";
    public static final String MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE_TITLE = "7월 12일 종일 일정";
    public static final String MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE_TITLE = "7월 28일~8월 일정";
    public static final String MONTH_7_DAY_29_AND_MONTH_8_SCHEDULE_TITLE = "7월 29일~8월 일정";

    /**
     * DATE
     */
    public static final LocalDateTime DATE_2023_05_01_00_00_00 = LocalDateTime.of(2023, 5, 1, 0, 0, 0);
    public static final LocalDateTime DATE_2023_05_01_23_59_59 = LocalDateTime.of(2023, 5, 1, 23, 59, 59);
    public static final LocalDateTime DATE_2023_05_31_00_00_00 = LocalDateTime.of(2023, 5, 31, 0, 0, 0);
    public static final LocalDateTime DATE_2023_05_31_23_59_59 = LocalDateTime.of(2023, 5, 31, 23, 59, 59);
    public static final LocalDateTime DATE_2023_06_01_00_00_00 = LocalDateTime.of(2023, 6, 1, 0, 0, 0);
    public static final LocalDateTime DATE_2023_06_25_10_00_00 = LocalDateTime.of(2023, 6, 25, 10, 0, 0);
    public static final LocalDateTime DATE_2023_07_12_00_00_00 = LocalDateTime.of(2023, 7, 12, 0, 0, 0);
    public static final LocalDateTime DATE_2023_07_12_10_00_00 = LocalDateTime.of(2023, 7, 12, 10, 0, 0);
    public static final LocalDateTime DATE_2023_07_12_18_00_00 = LocalDateTime.of(2023, 7, 12, 18, 0, 0);
    public static final LocalDateTime DATE_2023_07_12_23_59_59 = LocalDateTime.of(2023, 7, 12, 23, 59, 59);
    public static final LocalDateTime DATE_2023_07_28_10_00_00 = LocalDateTime.of(2023, 7, 28, 10, 0, 0);
    public static final LocalDateTime DATE_2023_07_29_10_00_00 = LocalDateTime.of(2023, 7, 29, 10, 0, 0);
    public static final LocalDateTime DATE_2023_07_31_23_59_59 = LocalDateTime.of(2023, 7, 31, 23, 59, 59);
    public static final LocalDateTime DATE_2023_08_30_12_00_00 = LocalDateTime.of(2023, 8, 30, 10, 0, 0);

    /**
     * REGISTER_REQUEST
     */
    public static final ScheduleRegisterRequest MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_REGISTER_REQUEST = new ScheduleRegisterRequest(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE, DATE_2023_07_12_10_00_00, DATE_2023_07_12_18_00_00);

    /**
     * UPDATE_REQUEST
     */
    public static final ScheduleUpdateRequest MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_UPDATE_REQUEST = new ScheduleUpdateRequest(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE, DATE_2023_07_12_00_00_00, DATE_2023_07_12_18_00_00);

    /**
     * ENTITY
     */
    public static Schedule MONTH_5_FIRST_DAY_SCHEDULE(final Long teamPlaceId) {
        return new Schedule(teamPlaceId, new Title(teamPlaceId + "번 팀플 " + MONTH_5_FIRST_DAY_SCHEDULE_TITLE), new Span(DATE_2023_05_01_00_00_00, DATE_2023_05_01_23_59_59));
    }

    public static Schedule MONTH_5_LAST_DAY_SCHEDULE(final Long teamPlaceId) {
        return new Schedule(teamPlaceId, new Title(teamPlaceId + "번 팀플 " + MONTH_5_LAST_DAY_SCHEDULE_TITLE), new Span(DATE_2023_05_31_00_00_00, DATE_2023_05_31_23_59_59));
    }

    public static Schedule MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE(final Long teamPlaceId) {
        return new Schedule(teamPlaceId, new Title(teamPlaceId + "번 팀플 " + MONTH_6_AND_MONTH_7_DAY_12_SCHEDULE_TITLE), new Span(DATE_2023_06_25_10_00_00, DATE_2023_07_12_18_00_00));
    }

    public static Schedule MONTH_6_AND_MONTH_7_SCHEDULE(final Long teamPlaceId) {
        return new Schedule(teamPlaceId, new Title(teamPlaceId + "번 팀플 " + MONTH_6_AND_MONTH_7_SCHEDULE_TITLE), new Span(DATE_2023_06_01_00_00_00, DATE_2023_07_31_23_59_59));
    }

    public static Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(final Long teamPlaceId) {
        return new Schedule(teamPlaceId, new Title(teamPlaceId + "번 팀플 " + MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_TITLE), new Span(DATE_2023_07_12_10_00_00, DATE_2023_07_12_18_00_00));
    }

    public static Schedule MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE(final Long teamPlaceId) {
        return new Schedule(teamPlaceId, new Title(teamPlaceId + "번 팀플 " + MONTH_7_AND_DAY_12_ALL_DAY_SCHEDULE_TITLE), new Span(DATE_2023_07_12_00_00_00, DATE_2023_07_12_23_59_59));
    }

    public static Schedule MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE(final Long teamPlaceId) {
        return new Schedule(teamPlaceId, new Title(teamPlaceId + "번 팀플 " + MONTH_7_DAY_28_AND_MONTH_8_SCHEDULE_TITLE), new Span(DATE_2023_07_28_10_00_00, DATE_2023_08_30_12_00_00));
    }

    public static Schedule MONTH_7_DAY_29_AND_MONTH_8_SCHEDULE(final Long teamPlaceId) {
        return new Schedule(teamPlaceId, new Title(teamPlaceId + "번 팀플 " + MONTH_7_DAY_29_AND_MONTH_8_SCHEDULE_TITLE), new Span(DATE_2023_07_29_10_00_00, DATE_2023_08_30_12_00_00));
    }
}
