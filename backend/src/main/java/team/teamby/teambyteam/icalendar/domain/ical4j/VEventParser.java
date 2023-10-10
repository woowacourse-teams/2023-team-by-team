package team.teamby.teambyteam.icalendar.domain.ical4j;

import net.fortuna.ical4j.model.component.VEvent;
import net.fortuna.ical4j.util.UidGenerator;
import team.teamby.teambyteam.schedule.domain.Schedule;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.temporal.Temporal;
import java.util.TimeZone;

public class VEventParser {

    private static final String ASIA_SEOUL = "Asia/Seoul";
    private static final long ONE_DAY_OFFSET = 1L;

    public VEvent parse(final Schedule schedule) {
        final String title = schedule.getTitle().getValue();

        final Temporal startTemporal = getStartTemporal(schedule);
        final Temporal endTemporal = getEndTemporal(schedule);

        final VEvent vEvent = new VEvent(startTemporal, endTemporal, title);

        final UidGenerator uidGenerator = new ScheduleUidGenerator(schedule);
        vEvent.add(uidGenerator.generateUid());

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
