package team.teamby.teambyteam.feed.application.event;

import team.teamby.teambyteam.common.domain.DomainEvent;

public class FeedEvent implements DomainEvent<Long> {
    private final Long feedId;

    public FeedEvent(final Long feedId) {
        this.feedId = feedId;
    }

    @Override
    public Long getDomainId() {
        return feedId;
    }
}
