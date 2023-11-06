package team.teamby.teambyteam.sse.domain;

public class TeamPlaceConnectedEvent implements TeamPlaceSseEvent {

    private static final String EVENT_NAME = "connect";

    private final DummyEvent event;

    private TeamPlaceConnectedEvent(final DummyEvent event) {
        this.event = event;
    }

    public static TeamPlaceConnectedEvent of(final Long teamPlaceId, final Long memberId) {
        return new TeamPlaceConnectedEvent(new DummyEvent(teamPlaceId, memberId));
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
