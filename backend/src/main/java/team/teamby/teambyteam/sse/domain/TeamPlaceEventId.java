package team.teamby.teambyteam.sse.domain;

import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.Objects;

@EqualsAndHashCode
public class TeamPlaceEventId {

    private final String DELIMITER = "_";

    private final Long teamPlaceId;
    private final String eventName;
    private final LocalDateTime timeStamp;

    private TeamPlaceEventId(final Long teamPlaceId, final String eventName, final LocalDateTime timeStamp) {
        this.teamPlaceId = teamPlaceId;
        this.eventName = eventName;
        this.timeStamp = timeStamp;
    }

    public static TeamPlaceEventId of(final Long teamPlaceId, final String eventName) {
        return new TeamPlaceEventId(teamPlaceId, eventName, LocalDateTime.now());
    }

    public boolean isPublishedTo(final Long teamPlaceId) {
        return Objects.equals(this.teamPlaceId, teamPlaceId);
    }

    public LocalDateTime getTimeStamp() {
        return timeStamp;
    }

    @Override
    public String toString() {
        return teamPlaceId + DELIMITER + eventName + DELIMITER + timeStamp;
    }
}
