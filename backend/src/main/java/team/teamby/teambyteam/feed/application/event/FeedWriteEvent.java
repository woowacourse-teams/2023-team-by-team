package team.teamby.teambyteam.feed.application.event;

import team.teamby.teambyteam.feed.application.dto.FeedResponse;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;

public class FeedWriteEvent implements TeamPlaceSseEvent {

    private static final String EVENT_NAME = "new_thread";

    private final Long teamPlaceId;
    private final FeedResponse feedResponse;

    public FeedWriteEvent(final Long teamPlaceId, final FeedResponse feedResponse) {
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
    public Object getEvent() {
        return feedResponse;
    }
}
