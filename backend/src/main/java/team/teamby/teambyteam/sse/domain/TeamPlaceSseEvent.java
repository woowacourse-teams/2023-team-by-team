package team.teamby.teambyteam.sse.domain;

import team.teamby.teambyteam.sse.domain.emitter.TeamPlaceEmitterId;

public interface TeamPlaceSseEvent {

    Long getTeamPlaceId();

    String getEventName();

    Object getEvent(TeamPlaceEmitterId emitterId);
}
