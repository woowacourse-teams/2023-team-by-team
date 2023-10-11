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
    private final Map<TeamPlaceEventId, Object> eventCache = new ConcurrentHashMap<>();

    public SseEmitter save(final TeamPlaceEmitterId emitterId, final SseEmitter sseEmitter) {
        emitters.put(emitterId, sseEmitter);

        sseEmitter.onCompletion(() -> emitters.remove(emitterId));
        sseEmitter.onTimeout(() -> emitters.remove(emitterId));

        return sseEmitter;
    }

    public Map<TeamPlaceEmitterId, SseEmitter> findByTeamPlaceId(final Long teamPlaceId) {
        return emitters.entrySet()
                .stream()
                .filter(entity -> entity.getKey().isTeamPlaceId(teamPlaceId))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public void deleteById(final TeamPlaceEmitterId id) {
        emitters.remove(id);
    }

    public Map<TeamPlaceEventId, Object> findAllEventCacheWithId(final Long teamPlaceId) {
        return eventCache.entrySet()
                .stream()
                .filter(entry -> entry.getKey().isPublishedTo(teamPlaceId))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public void addEventCache(final TeamPlaceEventId teamPlaceEventId, final Object event) {
        eventCache.put(teamPlaceEventId, event);
    }

    @Scheduled(fixedDelayString = "${sse.cache-schedule-period}")
    private void cacheRefreshSchedule() {
        final LocalDateTime now = LocalDateTime.now();
        eventCache.keySet().forEach(key -> {
                    if (key.getTimeStamp().isBefore(now.minusMinutes(1))) {
                        eventCache.remove(key);
                    }
                }
        );
    }
}
