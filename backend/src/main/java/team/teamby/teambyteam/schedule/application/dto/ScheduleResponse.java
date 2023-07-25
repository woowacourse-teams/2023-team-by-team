package team.teamby.teambyteam.schedule.application.dto;

import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.Span;

import java.time.format.DateTimeFormatter;

public record ScheduleResponse(
        Long id,
        String title,
        String startDateTime,
        String endDateTime
) {
    private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm";

    public static ScheduleResponse from(final Schedule schedule) {
        final Span span = schedule.getSpan();
        final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_TIME_FORMAT);
        final String startDateTime = span.getStartDateTime().format(dateTimeFormatter);
        final String endDateTime = span.getEndDateTime().format(dateTimeFormatter);

        return new ScheduleResponse(
                schedule.getId(),
                schedule.getTitle().getValue(),
                startDateTime,
                endDateTime
        );
    }
}
