package team.teamby.teambyteam.schedule.application.event;

import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;

public class ScheduleCreateEvent extends ScheduleEvent {

    public ScheduleCreateEvent(final Long scheduleId, final Long teamPlaceId, final Title title, final Span span) {
        super(scheduleId, teamPlaceId, title, span);
    }

    @Override
    public EventType getEventType() {
        return EventType.CREATE;
    }

    @Override
    public ScheduleUpdateEventDto getUpdatedScheduleInfo() {
        return null;
    }
}
