package team.teamby.teambyteam.sse.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import team.teamby.teambyteam.sse.domain.TeamPlaceEmitterId;
import team.teamby.teambyteam.sse.domain.TeamPlaceEmitterRepository;
import team.teamby.teambyteam.sse.domain.TeamPlaceEventId;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;

import java.io.IOException;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class TeamPlaceSsePublisher {

    private final TeamPlaceEmitterRepository teamPlaceEmitterRepository;
    private final ObjectMapper objectMapper;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void publishEvent(final TeamPlaceSseEvent teamPlaceSseEvent) {

        final Long targetTeamPlaceId = teamPlaceSseEvent.getTeamPlaceId();
        final String eventName = teamPlaceSseEvent.getEventName();
        final String eventData = extractEventDataAsJson(teamPlaceSseEvent);
        final TeamPlaceEventId eventId = TeamPlaceEventId.of(targetTeamPlaceId, eventName);

        final Map<TeamPlaceEmitterId, SseEmitter> emitters = teamPlaceEmitterRepository.findByTeamPlaceId(targetTeamPlaceId);
        emitters.forEach((id, emitter) -> sendEvent(id, emitter, eventId, eventName, eventData));
        teamPlaceEmitterRepository.addEventCache(eventId, teamPlaceSseEvent.getEvent());
    }

    private String extractEventDataAsJson(final TeamPlaceSseEvent teamPlaceSseEvent) {
        final String eventData;
        try {
            eventData = objectMapper.writeValueAsString(teamPlaceSseEvent.getEvent());
        } catch (JsonProcessingException e) {
            log.error("SSE data json parsing Exception - " + teamPlaceSseEvent.getEvent().toString(),  e);
            throw new RuntimeException(e);
        }
        return eventData;
    }

    private void sendEvent(
            final TeamPlaceEmitterId emitterId,
            final SseEmitter emitter,
            final TeamPlaceEventId eventId,
            final String eventName,
            final String eventData
    ) {
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId.toString())
                    .name(eventName)
                    .data(eventData)
            );
        } catch (IOException e) {
            teamPlaceEmitterRepository.deleteById(emitterId);
            log.error("fail to send sse", e);
            throw new RuntimeException(e);
        }
    }
}
