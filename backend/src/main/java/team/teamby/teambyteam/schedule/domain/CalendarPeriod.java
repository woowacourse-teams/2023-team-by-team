package team.teamby.teambyteam.schedule.domain;

import team.teamby.teambyteam.schedule.exception.ScheduleException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * 캘린더 일정
 * 일정에 해당하려면 startDateTime <= PERIOD < endDateTime
 *
 * @param startDateTime inclusive DateTime
 * @param endDatetime   exclusive DateTime
 */
public record CalendarPeriod(
        LocalDateTime startDateTime,
        LocalDateTime endDatetime
) {
    private static final int FIRST_DAY_OF_MONTH = 1;
    private static final LocalTime START_TIME_OF_DAY = LocalTime.of(0, 0, 0);
    private static final int NEXT_MONTH_OFFSET = 1;
    private static final int NEXT_DAY_OFFSET = 1;

    public static CalendarPeriod of(final int year, final int month) {
        final LocalDate startDate = LocalDate.of(year, month, FIRST_DAY_OF_MONTH);
        final LocalDate endDate = startDate.plusMonths(NEXT_MONTH_OFFSET).withDayOfMonth(FIRST_DAY_OF_MONTH);

        return new CalendarPeriod(LocalDateTime.of(startDate, START_TIME_OF_DAY), LocalDateTime.of(endDate, START_TIME_OF_DAY));
    }

    public static CalendarPeriod of(final int year, final int month, final int day) {
        LocalDate dailyDate = LocalDate.of(year, month, day);
        LocalDate nextDay = dailyDate.plusDays(NEXT_DAY_OFFSET);

        return new CalendarPeriod(LocalDateTime.of(dailyDate, START_TIME_OF_DAY), LocalDateTime.of(nextDay, START_TIME_OF_DAY));
    }

    public static CalendarPeriod of(final LocalDate startDate, final LocalDate endDate) {
        validateOrder(startDate, endDate);
        return new CalendarPeriod(
                LocalDateTime.of(startDate, START_TIME_OF_DAY),
                LocalDateTime.of(endDate.plusDays(NEXT_DAY_OFFSET), START_TIME_OF_DAY)
        );
    }

    private static void validateOrder(final LocalDate startDate, final LocalDate endDate) {
        if (endDate.isBefore(startDate)) {
            throw new ScheduleException.SpanWrongOrderException(
                    LocalDateTime.of(startDate, START_TIME_OF_DAY),
                    LocalDateTime.of(endDate, START_TIME_OF_DAY)
            );
        }
    }
}
