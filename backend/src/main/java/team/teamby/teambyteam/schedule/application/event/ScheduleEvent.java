package team.teamby.teambyteam.schedule.application.event;

import team.teamby.teambyteam.common.domain.DomainEvent;

public abstract class ScheduleEvent implements DomainEvent<Long> {

    private final Long scheduleId;
    private final Long teamPlaceId;

    protected ScheduleEvent(final Long scheduleId, final Long teamPlaceId) {
        this.scheduleId = scheduleId;
        this.teamPlaceId = teamPlaceId;
    }

    @Override
    public Long getDomainId() {
        return scheduleId;
    }

    public Long getTeamPlaceId() {
        return teamPlaceId;
    }
}
