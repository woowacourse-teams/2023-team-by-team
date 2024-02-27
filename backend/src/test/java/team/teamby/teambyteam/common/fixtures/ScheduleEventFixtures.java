package team.teamby.teambyteam.common.fixtures;

import team.teamby.teambyteam.schedule.application.event.ScheduleCreateEvent;
import team.teamby.teambyteam.schedule.domain.Schedule;

public class ScheduleEventFixtures {

    public static ScheduleCreateEvent SCHEDULE_CREATE_EVENT(final Schedule schedule) {
        return new ScheduleCreateEvent(schedule.getId(), schedule.getTeamPlaceId());
    }
}
