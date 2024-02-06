package team.teamby.teambyteam.schedule.application.event;

import lombok.Getter;
import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;

@Getter
public abstract class ScheduleEvent implements DomainEvent<Long> {

    private final Long scheduleId;
    private final Long teamPlaceId;
    private final Title title;
    private final Span span;

    protected ScheduleEvent(final Long scheduleId, final Long teamPlaceId, final Title title, final Span span) {
        this.scheduleId = scheduleId;
        this.teamPlaceId = teamPlaceId;
        this.title = title;
        this.span = span;
    }

    @Override
    public Long getDomainId() {
        return scheduleId;
    }

    public abstract EventType getEventType();

    public abstract ScheduleUpdateEventDto getUpdatedScheduleInfo();
}
