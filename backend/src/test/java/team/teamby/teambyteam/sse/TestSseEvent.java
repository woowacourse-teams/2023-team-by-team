package team.teamby.teambyteam.sse;

import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;
import team.teamby.teambyteam.sse.domain.emitter.TeamPlaceEmitterId;

public class TestSseEvent implements TeamPlaceSseEvent {
    private final Long teamPlaceId;
    private final String name;
    private final TestData data;

    public TestSseEvent(final Long teamPlaceId, final String name, final String data) {
        this.teamPlaceId = teamPlaceId;
        this.name = name;
        this.data = new TestData(teamPlaceId, data);
    }

    @Override
    public Long getTeamPlaceId() {
        return teamPlaceId;
    }

    @Override
    public String getEventName() {
        return name;
    }

    @Override
    public Object getEvent(final TeamPlaceEmitterId emitterId) {
        return data;
    }

    private record TestData(long id, String data) {
    }
}
