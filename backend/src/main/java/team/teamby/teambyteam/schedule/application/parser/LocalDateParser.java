package team.teamby.teambyteam.schedule.application.parser;

import org.springframework.stereotype.Component;
import team.teamby.teambyteam.schedule.exception.ScheduleException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Component
public class LocalDateParser {

    private static final DateTimeFormatter DATE_PARAM_FORMAT = DateTimeFormatter.ofPattern("yyyyMMdd");

    public LocalDate parse(final String yearMonthDay) {
        try {
            return LocalDate.parse(yearMonthDay, DATE_PARAM_FORMAT);
        } catch (final DateTimeParseException e) {
            throw new ScheduleException.dateFormatException(e);
        }
    }
}
