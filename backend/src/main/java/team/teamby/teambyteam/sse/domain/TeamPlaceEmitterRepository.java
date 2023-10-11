package team.teamby.teambyteam.sse.domain;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

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

    public void deleteById(final TeamPlaceEmitterId id) {
        emitters.remove(id);
    }

    public Map<TeamPlaceEventId, Object> findAllEventCacheWithId(final Long teamPlaceId) {
        return eventCache.entrySet()
                .stream()
                .filter(entry -> entry.getKey().isPublishedTo(teamPlaceId))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }
}
