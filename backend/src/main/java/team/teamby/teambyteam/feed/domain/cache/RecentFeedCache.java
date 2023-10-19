package team.teamby.teambyteam.feed.domain.cache;

import team.teamby.teambyteam.feed.domain.FeedThread;
import team.teamby.teambyteam.feed.domain.image.FeedThreadImage;

import java.time.LocalDateTime;
import java.util.List;

public interface RecentFeedCache {

    boolean isCached(final Long teamPlaceId, final int size);

    List<FeedCache> getCache(final Long teamPlaceId, final int size);

    void addCache(final Long teamPlaceId, final FeedCache cache);

    record FeedCache(
            Long id,
            String type,
            Long authorId,
            LocalDateTime createdAt,
            String content,
            List<FeedImageCache> images
    ) {
        public static FeedCache from(final FeedThread feedThread) {
            return new FeedCache(
                    feedThread.getId(),
                    feedThread.getType().name(),
                    feedThread.getAuthorId(),
                    feedThread.getCreatedAt(),
                    feedThread.getContent().getValue(),
                    feedThread.getImages().stream()
                            .map(FeedImageCache::from)
                            .toList()
            );
        }
    }

    record FeedImageCache(
            Long id,
            Boolean isExpired,
            String name,
            String url
    ) {
        public static FeedImageCache from(final FeedThreadImage feedThreadImage) {
            return new FeedImageCache(
                    feedThreadImage.getId(),
                    false,
                    feedThreadImage.getImageName().getValue(),
                    feedThreadImage.getImageUrl().getValue()
            );
        }
    }
}
