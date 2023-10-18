package team.teamby.teambyteam.feed.application.event;

import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;

public class FeedEvent implements TeamPlaceSseEvent {

    private static final String EVENT_NAME = "new_thread";

    private final FeedSse feedSse;

    private FeedEvent(final FeedSse feedSse) {
        this.feedSse = feedSse;
    }

    public static FeedEvent of(final Long teamPlaceId, final Long feedId, final Status status) {
        return new FeedEvent(new FeedSse(teamPlaceId, feedId, status));
    }

    @Override
    public Long getTeamPlaceId() {
        return feedSse.teamPlaceId;
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public Object getEvent() {
        return feedSse;
    }

    public record FeedSse(Long teamPlaceId, Long ThreadId, Status status) {
    }

    public enum Status {
        WRITE
    }
}
