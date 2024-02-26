package team.teamby.teambyteam.icalendar.domain.ical4j;

import net.fortuna.ical4j.model.property.Uid;
import team.teamby.teambyteam.schedule.domain.Schedule;

public class ScheduleUidGenerator {

    private static final String DELIMITER = "-";

    public Uid generateUid(final Schedule schedule) {
        final String uidString = String.join(DELIMITER, String.valueOf(schedule.getTeamPlaceId()), String.valueOf(schedule.getId()));
        return new Uid(uidString);
    }
}
