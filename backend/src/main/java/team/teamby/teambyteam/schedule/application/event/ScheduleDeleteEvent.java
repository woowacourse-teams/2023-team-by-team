package team.teamby.teambyteam.schedule.application.event;

import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;

public class ScheduleDeleteEvent extends ScheduleEvent {

    public ScheduleDeleteEvent(final Long scheduleId, final Long teamPlaceId, final Title title, final Span span) {
        super(scheduleId, teamPlaceId, title, span);
    }

    @Override
    public EventType getEventType() {
        return EventType.DELETE;
    }

    @Override
    public ScheduleUpdateEventDto getScheduleUpdateEventDto() {
        return null;
    }
}
