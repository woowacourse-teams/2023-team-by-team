package team.teamby.teambyteam.sse.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.sse.domain.TeamPlaceEmitterId;
import team.teamby.teambyteam.sse.domain.TeamPlaceEmitterRepository;
import team.teamby.teambyteam.sse.domain.TeamPlaceEventId;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Map;
import java.util.Objects;
import java.util.function.Consumer;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SseSubscribeService {

    public static final String DEFAULT_EVENT_ID = "";
    private static final String SSE_CONNECTED_MESSAGE_FORMAT = "EventStream Connected. [memberId=%d]";
    private static final String CONNECT = "connect";
    private static final Long DEFAULT_TIMEOUT = 1L * 1000 * 60; // TODO: 시간 적절히 조절하기
    private static final Comparator<Map.Entry<TeamPlaceEventId, Object>> EVENT_ID_TIME_COMPARATOR = (entity1, entity2) -> {
        final LocalDateTime timeStamp1 = entity1.getKey().getTimeStamp();
        final LocalDateTime timeStamp2 = entity2.getKey().getTimeStamp();

        return timeStamp1.compareTo(timeStamp2);
    };

    private final MemberRepository memberRepository;
    private final TeamPlaceEmitterRepository teamplaceEmitterRepository;
    private final ObjectMapper objectMapper;

    public SseEmitter subscribe(final Long teamPlaceId, final MemberEmailDto memberEmailDto, final String lastEventId) {

        final Long memberId = memberRepository.findIdByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()))
                .id();

        final TeamPlaceEmitterId emitterId = TeamPlaceEmitterId.of(teamPlaceId, memberId);
        final SseEmitter emitter = teamplaceEmitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));

        sendToClient(emitterId, emitter, emitterId.toString(), CONNECT, String.format(SSE_CONNECTED_MESSAGE_FORMAT, memberId));

        if (!Objects.isNull(lastEventId) && !lastEventId.isBlank()) {
            sendCachedEvents(emitterId, emitter, teamPlaceId, TeamPlaceEventId.from(lastEventId));
        }

        return emitter;
    }

    private void sendToClient(
            final TeamPlaceEmitterId emitterId,
            final SseEmitter emitter,
            final String eventId,
            final String eventName,
            final Object data
    ) {
        try {
            emitter.send(SseEmitter.event()
                    .id(eventId)
                    .name(eventName)
                    .data(data));
        } catch (IOException e) {
            teamplaceEmitterRepository.deleteById(emitterId);
            log.error("fail to send sse", e);
            throw new RuntimeException(e);
        }
    }

    private void sendCachedEvents(
            final TeamPlaceEmitterId emitterId,
            final SseEmitter emitter,
            final Long teamPlaceId,
            final TeamPlaceEventId lastEventId
    ) {
        final Map<TeamPlaceEventId, Object> events = teamplaceEmitterRepository.findAllEventCacheWithId(teamPlaceId);
        events.entrySet().stream()
                .filter(entry -> entry.getKey().isPublishedAfter(lastEventId))
                .sorted(EVENT_ID_TIME_COMPARATOR)
                .forEach(cacheSendConsumer(emitterId, emitter));
    }

    private Consumer<Map.Entry<TeamPlaceEventId, Object>> cacheSendConsumer(
            final TeamPlaceEmitterId emitterId,
            final SseEmitter emitter
    ) {
        return entry -> {
            try {
                final String eventName = entry.getKey().getEventName();
                final String eventDataString = objectMapper.writeValueAsString(entry.getValue());
                sendToClient(emitterId, emitter, entry.getKey().toString(), eventName, eventDataString);
            } catch (JsonProcessingException e) {
                log.error("SSE data json parsing Exception - " + entry.getValue().toString(), e);
                throw new RuntimeException(e);
            }
        };
    }
}
