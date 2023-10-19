package team.teamby.teambyteam.sse.domain;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TeamPlaceEmitterRepository {

    private static final int CACHE_REMOVE_MINUTE = 1;

    private final Map<TeamPlaceEmitterId, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final EventCache eventCache = new EventCache();

    public SseEmitters save(final TeamPlaceEmitterId emitterId, final SseEmitter sseEmitter) {
        emitters.put(emitterId, sseEmitter);

        sseEmitter.onCompletion(() -> {
            log.info("emitter complete for {}", emitterId);
            emitters.remove(emitterId);
        });
        sseEmitter.onTimeout(() -> {
            log.info("emitter timeout for {}", emitterId);
            emitters.remove(emitterId);
        });
        sseEmitter.onError((e) -> {
            log.error("emitter error for {}, error message : {}", emitterId, e.getMessage());
            emitters.remove(emitterId);
        });

        log.info("save SseEmitter {}", emitterId.toString());
        return new SseEmitters(Map.of(emitterId, sseEmitter));
    }

    public SseEmitters findByTeamPlaceId(final Long teamPlaceId) {
        final Map<TeamPlaceEmitterId, SseEmitter> filteredEmitters = this.emitters.entrySet()
                .stream()
                .filter(entity -> entity.getKey().isTeamPlaceId(teamPlaceId))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        log.info("Sse Emitter found {}, teamPlaceId : {}", filteredEmitters.size(), teamPlaceId);
        return new SseEmitters(filteredEmitters);
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
        eventCache.clearCacheFor(CACHE_REMOVE_MINUTE);
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
