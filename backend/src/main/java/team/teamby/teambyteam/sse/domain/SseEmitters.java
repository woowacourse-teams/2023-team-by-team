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
        emitters.forEach(
                (emitterId, emitter) -> {
                    try {
                        emitter.send(SseEmitter.event()
                                .id(eventId.toString())
                                .name(event.getEventName())
                                .data(extractEventDataAsJson(event))
                        );
                    } catch (IOException e) {
                        teamPlaceEmitterRepository.deleteById(emitterId);
                        log.error("fail to send sse", e);
                        throw new RuntimeException(e);
                    }
                }
        );
    }

    private String extractEventDataAsJson(final TeamPlaceSseEvent teamPlaceSseEvent) {
        final String eventData;
        try {
            eventData = objectMapper.writeValueAsString(teamPlaceSseEvent.getEvent());
        } catch (JsonProcessingException e) {
            log.error("SSE data json parsing Exception - " + teamPlaceSseEvent.getEvent().toString(), e);
            throw new RuntimeException(e);
        }
        return eventData;
    }
}
