package team.teamby.teambyteam.sse.domain.emitter;

import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.Objects;

@EqualsAndHashCode
public class TeamPlaceEmitterId {

    private static final String DELIMITER = "_";

    private final Long teamPlaceId;
    private final Long memberId;
    private final LocalDateTime timeStamp;

    private TeamPlaceEmitterId(final Long teamPlaceId, final Long memberId, final LocalDateTime timeStamp) {
        this.teamPlaceId = teamPlaceId;
        this.memberId = memberId;
        this.timeStamp = timeStamp;
    }

    public static TeamPlaceEmitterId of(final Long teamPlaceId, final Long memberId) {
        return new TeamPlaceEmitterId(teamPlaceId, memberId, LocalDateTime.now());
    }

    public boolean isTeamPlaceId(final Long teamPlaceId) {
        return Objects.equals(this.teamPlaceId, teamPlaceId);
    }

    public boolean isMemberId(final Long memberId) {
        return Objects.equals(this.memberId, memberId);
    }

    @Override
    public String toString() {
        return teamPlaceId + DELIMITER + memberId + DELIMITER + timeStamp;
    }
}
