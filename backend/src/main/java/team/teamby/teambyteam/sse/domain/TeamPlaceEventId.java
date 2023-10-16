package team.teamby.teambyteam.sse.domain;

import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@EqualsAndHashCode
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class TeamPlaceEventId {

    private static final String DELIMITER = "_";

    private final Long teamPlaceId;
    private final String eventName;
    private final LocalDateTime timeStamp;

    private TeamPlaceEventId() {
        this.teamPlaceId = null;
        this.eventName = null;
        this.timeStamp = null;
    }

    public static TeamPlaceEventId of(final Long teamPlaceId, final String eventName) {
        return new TeamPlaceEventId(teamPlaceId, eventName, LocalDateTime.now());
    }

    public static TeamPlaceEventId from(final String stringValue) {
        final int idIndex = stringValue.indexOf(DELIMITER);
        final int nameIndex = stringValue.lastIndexOf(DELIMITER);

        final Long teamPlaceId = Long.valueOf(stringValue.substring(0, idIndex));
        final String eventName = stringValue.substring(idIndex + 1, nameIndex);
        final LocalDateTime timeStamp = LocalDateTime.parse(stringValue.substring(nameIndex + 1));

        return new TeamPlaceEventId(teamPlaceId, eventName, timeStamp);
    }

    public boolean isPublishedTo(final Long teamPlaceId) {
        return Objects.equals(this.teamPlaceId, teamPlaceId);
    }

    public boolean isPublishedAfter(final TeamPlaceEventId lastEventId) {
        return timeStamp.isAfter(lastEventId.timeStamp);
    }

    @Override
    public String toString() {
        return teamPlaceId + DELIMITER + eventName + DELIMITER + timeStamp;
    }
}
