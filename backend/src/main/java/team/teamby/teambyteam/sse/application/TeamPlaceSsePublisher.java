package team.teamby.teambyteam.sse.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import team.teamby.teambyteam.sse.domain.SseEmitters;
import team.teamby.teambyteam.sse.domain.TeamPlaceEmitterRepository;
import team.teamby.teambyteam.sse.domain.TeamPlaceEventId;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;

@RequiredArgsConstructor
@Service
public class TeamPlaceSsePublisher {

    private final TeamPlaceEmitterRepository teamPlaceEmitterRepository;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void publishEvent(final TeamPlaceSseEvent teamPlaceSseEvent) {
        final Long targetTeamPlaceId = teamPlaceSseEvent.getTeamPlaceId();
        final String eventName = teamPlaceSseEvent.getEventName();
        final TeamPlaceEventId eventId = TeamPlaceEventId.of(targetTeamPlaceId, eventName);

        final SseEmitters emitters = teamPlaceEmitterRepository.findByTeamPlaceId(targetTeamPlaceId);
        emitters.sendEvent(eventId, teamPlaceSseEvent);
        teamPlaceEmitterRepository.addEventCache(eventId, teamPlaceSseEvent.getEvent());
    }
}
