package team.teamby.teambyteam.schedule.application.event;

public class ScheduleCreateEvent extends ScheduleEvent {

    public ScheduleCreateEvent(final Long scheduleId, final Long teamPlaceId) {
        super(scheduleId, teamPlaceId);
    }
}
