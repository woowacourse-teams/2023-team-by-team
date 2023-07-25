package team.teamby.teambyteam.schedule.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record CalendarPeriod(
        LocalDateTime startDateTime,
        LocalDateTime endDatetime
) {
    private static final int FIRST_DAY_OF_MONTH = 1;
    private static final LocalTime START_TIME_OF_DAY = LocalTime.of(0, 0, 0);
    private static final LocalTime END_TIME_OF_DAY = LocalTime.of(23, 59, 59);
    public static final int NEXT_MONTH_OFFSET = 1;

    public static CalendarPeriod createPeriod(final int year, final int month) {
        final LocalDate startDate = LocalDate.of(year, month, FIRST_DAY_OF_MONTH);
        final LocalDate endDate = startDate.plusMonths(NEXT_MONTH_OFFSET).withDayOfMonth(FIRST_DAY_OF_MONTH);

        return new CalendarPeriod(LocalDateTime.of(startDate, START_TIME_OF_DAY), LocalDateTime.of(endDate, START_TIME_OF_DAY));
    }

    public static CalendarPeriod createDailyPeriod(final int year, final int month, final int day) {
        LocalDate dailyDate = LocalDate.of(year, month, day);

        return new CalendarPeriod(LocalDateTime.of(dailyDate, START_TIME_OF_DAY), LocalDateTime.of(dailyDate, END_TIME_OF_DAY));
    }
}
