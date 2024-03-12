package team.teamby.teambyteam.feed.application.event;

import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.feed.application.dto.FeedResponse;

public class FeedEvent implements DomainEvent<Long> {
    private final Long feedId;
    private final FeedResponse response;

    public FeedEvent(final FeedResponse response) {
        this.feedId = response.id();
        this.response = response;
    }

    @Override
    public Long getDomainId() {
        return feedId;
    }

    public FeedResponse response() {
        return response;
    }
}
