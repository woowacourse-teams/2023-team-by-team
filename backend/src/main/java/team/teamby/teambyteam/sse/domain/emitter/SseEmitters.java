package team.teamby.teambyteam.sse.domain.emitter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import team.teamby.teambyteam.sse.domain.TeamPlaceEventId;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;

import java.io.IOException;
import java.util.Map;

@Slf4j
public class SseEmitters {

    private static final ObjectMapper objectMapper;

    private final Map<TeamPlaceEmitterId, SseEmitter> emitters;

    static {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    public SseEmitters(final Map<TeamPlaceEmitterId, SseEmitter> emitters) {
        this.emitters = emitters;
    }

    public void sendEvent(final TeamPlaceEventId eventId, final TeamPlaceSseEvent event) {
        emitters.forEach(
                (emitterId, emitter) -> sendToEmitter(eventId, event.getEvent(emitterId), emitterId, emitter)
        );
    }

    private void sendToEmitter(
            final TeamPlaceEventId eventId,
            final Object event,
            final TeamPlaceEmitterId emitterId,
            final SseEmitter emitter
    ) {
        log.info("SSE 메시지 보내기 시도 : {}", emitterId.toString());
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId.toString())
                    .name(eventId.getEventName())
                    .data(extractEventDataAsJson(event))
            );
            log.info("SSE 메시지 보내기 성공 : {}, event : {}", emitterId.toString(), eventId.getEventName());
        } catch (IOException | RuntimeException exception) {
            log.error("SSE 메시지 보내기 실패 : {}, error : {}", exception.getMessage(), exception.getClass());
            emitter.complete();
        }
    }

    private String extractEventDataAsJson(final Object event) {
        final String eventData;
        try {
            eventData = objectMapper.writeValueAsString(event);
        } catch (JsonProcessingException e) {
            log.error("SSE data json parsing Exception - " + event.toString(), e);
            throw new IllegalArgumentException(e);
        }
        return eventData;
    }

    public SseEmitter getSingleEmitter() {
        if (emitters.size() != 1) {
            throw new IllegalStateException(String.format("생성된 SseEmitter가 1개가 아닙니다. emitter수 : %d", emitters.size()));
        }
        return emitters.values().stream()
                .findFirst()
                .orElseThrow();
    }
}
