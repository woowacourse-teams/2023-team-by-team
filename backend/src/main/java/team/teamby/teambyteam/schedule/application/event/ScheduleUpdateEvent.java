package team.teamby.teambyteam.schedule.application.event;

import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;

@Deprecated
public class ScheduleUpdateEvent extends ScheduleEvent {

    private final ScheduleUpdateEventDto scheduleUpdateEventDto;

    public ScheduleUpdateEvent(final Long scheduleId,
                               final Long teamPlaceId,
                               final Title title,
                               final Span span,
                               final ScheduleUpdateEventDto scheduleUpdateEventDto) {
        super(scheduleId, teamPlaceId, title, span);
        this.scheduleUpdateEventDto = scheduleUpdateEventDto;
    }

    @Override
    public EventType getEventType() {
        return EventType.UPDATE;
    }

    @Override
    public ScheduleUpdateEventDto getScheduleUpdateEventDto() {
        return scheduleUpdateEventDto;
    }
}
