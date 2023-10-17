package team.teamby.teambyteam.sse.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.sse.domain.SseEmitters;
import team.teamby.teambyteam.sse.domain.TeamPlaceConnectedEvent;
import team.teamby.teambyteam.sse.domain.TeamPlaceEmitterId;
import team.teamby.teambyteam.sse.domain.TeamPlaceEmitterRepository;
import team.teamby.teambyteam.sse.domain.TeamPlaceEventId;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SseSubscribeService {

    public static final String DEFAULT_EVENT_ID = "";
    private static final Long DEFAULT_TIMEOUT = 1L * 1000 * 60; // TODO: 시간 적절히 조절하기
    private static final Comparator<Map.Entry<TeamPlaceEventId, Object>> EVENT_ID_TIME_COMPARATOR = (entity1, entity2) -> {
        final LocalDateTime timeStamp1 = entity1.getKey().getTimeStamp();
        final LocalDateTime timeStamp2 = entity2.getKey().getTimeStamp();

        return timeStamp1.compareTo(timeStamp2);
    };

    private final MemberRepository memberRepository;
    private final TeamPlaceEmitterRepository teamplaceEmitterRepository;

    public SseEmitter subscribe(final Long teamPlaceId, final MemberEmailDto memberEmailDto, final String lastEventId) {

        final Long memberId = memberRepository.findIdByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()))
                .id();

        final TeamPlaceEmitterId emitterId = TeamPlaceEmitterId.of(teamPlaceId, memberId);
        final SseEmitters emitter = teamplaceEmitterRepository.save(emitterId, new SseEmitter(DEFAULT_TIMEOUT));

        final TeamPlaceConnectedEvent dummyEvent = TeamPlaceConnectedEvent.of(teamPlaceId, memberId);
        final TeamPlaceEventId dummyEventId = TeamPlaceEventId.of(teamPlaceId, dummyEvent.getEventName());
        emitter.sendEvent(dummyEventId, dummyEvent);

        if (!Objects.isNull(lastEventId) && !lastEventId.isBlank()) {
            sendCachedEvents(emitter, teamPlaceId, TeamPlaceEventId.from(lastEventId));
        }

        log.info("SSE 연결 생성 {}", emitterId);
        return emitter.getSingleEmitter();
    }

    private void sendCachedEvents(
            final SseEmitters emitter,
            final Long teamPlaceId,
            final TeamPlaceEventId lastEventId
    ) {
        final Map<TeamPlaceEventId, Object> events = teamplaceEmitterRepository.findAllEventCacheWithId(teamPlaceId);
        events.entrySet().stream()
                .filter(entry -> entry.getKey().isPublishedAfter(lastEventId))
                .sorted(EVENT_ID_TIME_COMPARATOR)
                .forEach(entry -> emitter.sendEvent(entry.getKey(), entry.getValue()));
    }
}
