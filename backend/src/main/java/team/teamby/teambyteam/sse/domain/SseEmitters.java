package team.teamby.teambyteam.sse.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;

@Slf4j
public class SseEmitters {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    private final TeamPlaceEmitterRepository teamPlaceEmitterRepository;
    private final Map<TeamPlaceEmitterId, SseEmitter> emitters;

    public SseEmitters(
            final Map<TeamPlaceEmitterId, SseEmitter> emitters,
            final TeamPlaceEmitterRepository teamPlaceEmitterRepository
    ) {
        this.emitters = emitters;
        this.teamPlaceEmitterRepository = teamPlaceEmitterRepository;
    }

    public void sendEvent(final TeamPlaceEventId eventId, final TeamPlaceSseEvent event) {
        sendEvent(eventId, event.getEvent());
    }

    public void sendEvent(final TeamPlaceEventId eventId, final Object event) {
        emitters.forEach(
                (emitterId, emitter) -> {
                    log.info("SSE 메시지 보내기 시도 : {}", emitterId.toString());
                    try {
                        emitter.send(SseEmitter.event()
                                .id(eventId.toString())
                                .name(eventId.getEventName())
                                .data(extractEventDataAsJson(event))
                        );
                        log.info("send event to {}, event : {}", emitterId.toString(), eventId.getEventName());
                    } catch (IOException exception) {
                        log.error("fail to send sse message : {}, error : {}", exception.getMessage(), exception.getClass());
                        emitter.completeWithError(exception);
                    }
                }
        );
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