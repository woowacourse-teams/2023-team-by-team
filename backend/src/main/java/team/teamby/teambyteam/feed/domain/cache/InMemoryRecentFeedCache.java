package team.teamby.teambyteam.feed.domain.cache;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
public class InMemoryRecentFeedCache implements RecentFeedCache {

    public static final long CACHE_REMOVE_POLICY_DAY = 3L;
    public static final int MAX_CACHE_FEED_SIZE = 20;

    private final Map<Long, Deque<FeedCache>> feedCaches = new ConcurrentHashMap<>();

    @Override
    public boolean isCached(final Long teamPlaceId, final int size) {
        final Deque<FeedCache> cachedData = feedCaches.get(teamPlaceId);
        return !Objects.isNull(cachedData) && cachedData.size() >= size;
    }

    @Override
    public List<FeedCache> getCache(final Long teamPlaceId, final int size) {
        return feedCaches.get(teamPlaceId)
                .stream()
                .limit(size)
                .collect(Collectors.toList());
    }

    @Override
    public void addCache(final Long teamPlaceId, final FeedCache cache) {
        feedCaches.putIfAbsent(teamPlaceId, new LinkedList<>());
        feedCaches.computeIfPresent(teamPlaceId, (id, caches) -> {
            caches.addFirst(cache);
            if (caches.size() > MAX_CACHE_FEED_SIZE) {
                caches.removeLast();
            }
            return caches;
        });
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void clearInactivatedTeamPlaceCache() {
        final LocalDateTime cacheRemoveDateTime = LocalDateTime.now().minusDays(CACHE_REMOVE_POLICY_DAY);
        feedCaches.forEach((key, value) -> {
            final FeedCache latest = value.getFirst();
            final LocalDateTime latestDateTime = latest.createdAt();
            if (latestDateTime.isBefore(cacheRemoveDateTime)) {
                feedCaches.remove(key);
            }
        });
    }
}
