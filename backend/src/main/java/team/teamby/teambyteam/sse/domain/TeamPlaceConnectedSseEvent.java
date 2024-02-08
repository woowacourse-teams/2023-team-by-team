package team.teamby.teambyteam.sse.domain;

import team.teamby.teambyteam.sse.domain.emitter.TeamPlaceEmitterId;

public class TeamPlaceConnectedSseEvent implements TeamPlaceSseEvent {

    private static final String EVENT_NAME = "connect";

    private final DummyEvent event;

    private TeamPlaceConnectedSseEvent(final DummyEvent event) {
        this.event = event;
    }

    public static TeamPlaceConnectedSseEvent of(final Long teamPlaceId, final Long memberId) {
        return new TeamPlaceConnectedSseEvent(new DummyEvent(teamPlaceId, memberId));
    }

    @Override
    public Long getTeamPlaceId() {
        return event.teamPlaceId;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public Object getEvent(final TeamPlaceEmitterId emitterId) {
        return event;
    }

    private record DummyEvent(Long teamPlaceId, Long memberId) {
    }
}
