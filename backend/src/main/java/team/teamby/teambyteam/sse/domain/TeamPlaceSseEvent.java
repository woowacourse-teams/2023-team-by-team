package team.teamby.teambyteam.sse.domain;

public interface TeamPlaceSseEvent {

    Long getTeamPlaceId();

    String getEventName();

    Object getEvent();
}
