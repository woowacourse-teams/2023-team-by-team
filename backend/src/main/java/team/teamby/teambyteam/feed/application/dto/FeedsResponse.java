package team.teamby.teambyteam.feed.application.dto;

import java.util.List;

public record FeedsResponse(
        List<FeedResponse> threads
) {
    public static FeedsResponse of(List<FeedResponse> feeds) {
        return new FeedsResponse(feeds);
    }
}
