package team.teamby.teambyteam.schedule.application.event;

import lombok.Getter;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;

@Getter
public abstract class ScheduleEvent {

    private final Long scheduleId;
    private final Long teamPlaceId;
    private final Title title;
    private final Span span;

    public ScheduleEvent(final Long scheduleId, final Long teamPlaceId, final Title title, final Span span) {
        this.scheduleId = scheduleId;
        this.teamPlaceId = teamPlaceId;
        this.title = title;
        this.span = span;
    }

    public abstract EventType getEventType();

    public abstract ScheduleUpdateEventDto getScheduleUpdateEventDto();
}
