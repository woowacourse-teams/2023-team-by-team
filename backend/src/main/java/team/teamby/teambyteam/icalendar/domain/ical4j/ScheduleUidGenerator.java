package team.teamby.teambyteam.icalendar.domain.ical4j;

import net.fortuna.ical4j.model.property.Uid;
import net.fortuna.ical4j.util.UidGenerator;
import team.teamby.teambyteam.schedule.domain.Schedule;

public class ScheduleUidGenerator implements UidGenerator {

    private static final String DELIMITER = "-";

    private final Long teamPlaceId;
    private final Long scheduleId;
    public ScheduleUidGenerator(final Schedule schedule) {
        this.teamPlaceId = schedule.getTeamPlaceId();
        this.scheduleId = schedule.getId();
    }

    @Override
    public Uid generateUid() {
        final String uidString = String.join(DELIMITER, String.valueOf(teamPlaceId), String.valueOf(scheduleId));
        return new Uid(uidString);
    }
}
