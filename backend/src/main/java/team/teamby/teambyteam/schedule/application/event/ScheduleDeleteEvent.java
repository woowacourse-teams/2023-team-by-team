package team.teamby.teambyteam.schedule.application.event;

public class ScheduleDeleteEvent extends ScheduleEvent {

    public ScheduleDeleteEvent(final Long scheduleId, final Long teamPlaceId) {
        super(scheduleId, teamPlaceId);
    }
}
