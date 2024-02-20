package team.teamby.teambyteam.icalendar.domain.ical4j;

import lombok.RequiredArgsConstructor;
import net.fortuna.ical4j.model.component.VEvent;
import team.teamby.teambyteam.schedule.domain.Schedule;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.temporal.Temporal;
import java.util.TimeZone;

@RequiredArgsConstructor
public class VEventParser {

    private static final String ASIA_SEOUL = "Asia/Seoul";
    private static final long ONE_DAY_OFFSET = 1L;

    private final ScheduleUidGenerator uidGenerator;

    public VEvent parse(final Schedule schedule) {
        final String title = schedule.getTitle().getValue();

        final Temporal startTemporal = getStartTemporal(schedule);
        final Temporal endTemporal = getEndTemporal(schedule);

        final VEvent vEvent = new VEvent(startTemporal, endTemporal, title);

        vEvent.add(uidGenerator.generateUid(schedule));

        return vEvent;
    }

    private Temporal getStartTemporal(final Schedule schedule) {
        if (schedule.isAllDay()) {
            return schedule.getStartDateTime().toLocalDate();
        }
        return convertToSeoulDateTime(schedule.getStartDateTime());
    }

    private Temporal getEndTemporal(final Schedule schedule) {
        if (schedule.isAllDay()) {
            return schedule.getEndDateTime().toLocalDate().plusDays(ONE_DAY_OFFSET);
        }
        return convertToSeoulDateTime(schedule.getEndDateTime());
    }

    private ZonedDateTime convertToSeoulDateTime(final LocalDateTime startDateTime) {
        return startDateTime.atZone(TimeZone.getTimeZone(ASIA_SEOUL).toZoneId());
    }
}
