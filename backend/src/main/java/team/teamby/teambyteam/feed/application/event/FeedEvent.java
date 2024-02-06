package team.teamby.teambyteam.feed.application.event;

import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.sse.domain.TeamPlaceEmitterId;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;

public class FeedEvent implements TeamPlaceSseEvent, DomainEvent<Long> {

    private static final String EVENT_NAME = "new_thread";

    private final FeedResponse feedResponse;
    private final Long feedId;
    private final Long teamPlaceId;

    public FeedEvent(final Long teamPlaceId, final FeedResponse feedResponse) {
        this.feedId = feedResponse.id();
        this.teamPlaceId = teamPlaceId;
        this.feedResponse = feedResponse;
    }

    @Override
    public Long getTeamPlaceId() {
        return teamPlaceId;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public Object getEvent(final TeamPlaceEmitterId emitterId) {
        if (emitterId.isMemberId(feedResponse.authorId())) {
            return new FeedResponse(
                    feedResponse.id(),
                    feedResponse.type(),
                    feedResponse.authorId(),
                    feedResponse.authorName(),
                    feedResponse.profileImageUrl(),
                    feedResponse.createdAt(),
                    feedResponse.content(),
                    feedResponse.images(),
                    true
            );
        }
        return new FeedResponse(
                feedResponse.id(),
                feedResponse.type(),
                feedResponse.authorId(),
                feedResponse.authorName(),
                feedResponse.profileImageUrl(),
                feedResponse.createdAt(),
                feedResponse.content(),
                feedResponse.images(),
                false
        );
    }

    @Override
    public Long getDomainId() {
        return feedId;
    }
}
