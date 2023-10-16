package team.teamby.teambyteam.sse.domain;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
public class TeamPlaceEmitterRepository {

    private final Map<TeamPlaceEmitterId, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final EventCache eventCache = new EventCache();

    public SseEmitter save(final TeamPlaceEmitterId emitterId, final SseEmitter sseEmitter) {
        emitters.put(emitterId, sseEmitter);

        sseEmitter.onCompletion(() -> emitters.remove(emitterId));
        sseEmitter.onTimeout(() -> emitters.remove(emitterId));

        return sseEmitter;
    }

    public SseEmitters findByTeamPlaceId(final Long teamPlaceId) {
        final Map<TeamPlaceEmitterId, SseEmitter> emitters = this.emitters.entrySet()
                .stream()
                .filter(entity -> entity.getKey().isTeamPlaceId(teamPlaceId))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        return new SseEmitters(emitters, this);
    }

    public void deleteById(final TeamPlaceEmitterId id) {
        emitters.remove(id);
    }

    public Map<TeamPlaceEventId, Object> findAllEventCacheWithId(final Long teamPlaceId) {
        return eventCache.findAllByTeamPlaceId(teamPlaceId);
    }

    public void addEventCache(final TeamPlaceEventId teamPlaceEventId, final Object event) {
        eventCache.put(teamPlaceEventId, event);
    }

    @Scheduled(fixedDelayString = "${sse.cache-schedule-period}")
    private void cacheRefreshSchedule() {
        eventCache.clearCacheFor(1);
    }

    private static class EventCache {

        private final Map<TeamPlaceEventId, Object> cache = new ConcurrentHashMap<>();

        public Map<TeamPlaceEventId, Object> findAllByTeamPlaceId(final Long teamPlaceId) {
            return cache.entrySet()
                    .stream()
                    .filter(entry -> entry.getKey().isPublishedTo(teamPlaceId))
                    .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        }

        public void put(final TeamPlaceEventId teamPlaceEventId, final Object event) {
            cache.put(teamPlaceEventId, event);
        }

        public void clearCacheFor(final int minutes) {
            final LocalDateTime now = LocalDateTime.now();
            cache.keySet().forEach(key -> {
                        if (key.getTimeStamp().isBefore(now.minusMinutes(minutes))) {
                            cache.remove(key);
                        }
                    }
            );
        }
    }
}
