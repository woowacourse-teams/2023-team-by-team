package team.teamby.teambyteam.schedule.application.event;

import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;

public class ScheduleUpdateEvent extends ScheduleEvent {

    private final ScheduleUpdateEventDto updatedScheduleInfo;

    public ScheduleUpdateEvent(final Long scheduleId,
                               final Long teamPlaceId,
                               final Title title,
                               final Span span,
                               final ScheduleUpdateEventDto updatedScheduleInfo) {
        super(scheduleId, teamPlaceId, title, span);
        this.updatedScheduleInfo = updatedScheduleInfo;
    }

    @Override
    public EventType getEventType() {
        return EventType.UPDATE;
    }

    @Override
    public ScheduleUpdateEventDto getUpdatedScheduleInfo() {
        return updatedScheduleInfo;
    }
}
