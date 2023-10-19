package team.teamby.teambyteam.feed.application.dto;

import team.teamby.teambyteam.feed.domain.cache.RecentFeedCache;
import team.teamby.teambyteam.feed.domain.cache.RecentFeedCache.FeedImageCache;

public record FeedImageResponse(
        Long id,
        Boolean isExpired,
        String name,
        String url
) {
    public static FeedImageResponse from(final FeedImageCache feedImageCache) {
        return new FeedImageResponse(
                feedImageCache.id(),
                feedImageCache.isExpired(),
                feedImageCache.name(),
                feedImageCache.url()
        );
    }
}
