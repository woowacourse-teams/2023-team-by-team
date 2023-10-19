package team.teamby.teambyteam.feed.domain.cache;

import java.util.List;

public interface RecentFeedCache {

    boolean isCached(final Long teamPlaceId, final int size);

    List<FeedCache> getCache(final Long teamPlaceId, final int size);

    void addCache(final Long teamPlaceId, final FeedCache cache);

    record FeedCache(
            Long id,
            String type,
            Long authorId,
            String profileImageUrl,
            String createdAt,
            String content,
            List<FeedImageCache> images
    ) {
    }

    record FeedImageCache(
            Long id,
            Boolean isExpired,
            String name,
            String url
    ) {
    }
}
