package team.teamby.teambyteam.sse.application;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.feed.application.event.FeedEvent;
import team.teamby.teambyteam.sse.domain.TeamPlaceEventId;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;
import team.teamby.teambyteam.sse.domain.converter.TeamPlaceEventConvertMapper;
import team.teamby.teambyteam.sse.domain.emitter.SseEmitters;
import team.teamby.teambyteam.sse.domain.emitter.TeamPlaceEmitterRepository;

@RequiredArgsConstructor
@Service
public class TeamPlaceSsePublisher {

    private final TeamPlaceEmitterRepository teamPlaceEmitterRepository;
    private final TeamPlaceEventConvertMapper eventConvertMapper;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT,
            classes = {FeedEvent.class}
    )
    public void publishEvent(final DomainEvent domainEvent) {
        final TeamPlaceSseEvent teamPlaceSseEvent = eventConvertMapper.convert(domainEvent);
        final Long targetTeamPlaceId = teamPlaceSseEvent.getTeamPlaceId();
        final String eventName = teamPlaceSseEvent.getEventName();
        final TeamPlaceEventId eventId = TeamPlaceEventId.of(targetTeamPlaceId, eventName);

        final SseEmitters emitters = teamPlaceEmitterRepository.findByTeamPlaceId(targetTeamPlaceId);
        emitters.sendEvent(eventId, teamPlaceSseEvent);
    }
}
