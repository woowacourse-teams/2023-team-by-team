package team.teamby.teambyteam.sse.domain;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TeamPlaceEmitterRepository {

    private static final String COMPLETE = "COMPLETE";
    private static final String TIME_OUT = "TIME_OUT";
    private static final String ERROR = "ERROR";
    private static final String METHOD_CALL = "METHOD_CALL";

    private final Map<TeamPlaceEmitterId, SseEmitter> emitters = new ConcurrentHashMap<>();

    public SseEmitters save(final TeamPlaceEmitterId emitterId, final SseEmitter sseEmitter) {
        addEmitterHandlers(emitterId, sseEmitter);
        emitters.put(emitterId, sseEmitter);

        log.info("SseEmitter 저장 {}", emitterId.toString());
        return new SseEmitters(Map.of(emitterId, sseEmitter));
    }

    private void addEmitterHandlers(final TeamPlaceEmitterId emitterId, final SseEmitter sseEmitter) {
        sseEmitter.onCompletion(() -> removeEmitter(emitterId, COMPLETE));
        sseEmitter.onTimeout(() -> removeEmitter(emitterId, TIME_OUT));
        sseEmitter.onError((e) -> {
            log.error("SseEmitter 에러 : {}, {}", emitterId.toString(), e);
            removeEmitter(emitterId, ERROR);
        });
    }

    private void removeEmitter(final TeamPlaceEmitterId emitterId, final String cause) {
        if (emitters.remove(emitterId) != null) {
            log.info("SseEmitter 제거 : {}, {}", emitterId.toString(), cause);
        } else {
            log.warn("SseEmitter 제거 실패 - EmitterId 찾을 수 없음 : {}", emitterId.toString());
        }
    }

    public SseEmitters findByTeamPlaceId(final Long teamPlaceId) {
        final Map<TeamPlaceEmitterId, SseEmitter> filteredEmitters = this.emitters.entrySet()
                .stream()
                .filter(entity -> entity.getKey().isTeamPlaceId(teamPlaceId))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        log.info("SseEmitter 탐색 {}개, teamPlaceId : {}", filteredEmitters.size(), teamPlaceId);
        return new SseEmitters(filteredEmitters);
    }

    public void closeById(final TeamPlaceEmitterId emitterId) {
        final SseEmitter emitter = emitters.remove(emitterId);
        if (emitter != null) {
            emitter.complete();
            log.info("SseEmitter 제거 : {}, {}", emitterId.toString(), METHOD_CALL);
        } else {
            log.warn("SseEmitter 제거 실패 - EmitterId 찾을 수 없음 : {}", emitterId.toString());
        }
    }
}
