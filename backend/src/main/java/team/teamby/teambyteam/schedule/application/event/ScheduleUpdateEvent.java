package team.teamby.teambyteam.schedule.application.event;

public class ScheduleUpdateEvent extends ScheduleEvent {

    public ScheduleUpdateEvent(final Long scheduleId, final Long teamPlaceId) {
        super(scheduleId, teamPlaceId);
    }
}
