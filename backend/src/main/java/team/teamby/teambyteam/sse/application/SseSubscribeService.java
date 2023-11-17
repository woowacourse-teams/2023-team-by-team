package team.teamby.teambyteam.sse.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class SseSubscribeService {

    public static final String DEFAULT_EVENT_ID = "";
    private final MemberRepository memberRepository;
    private final TeamPlaceEmitterRepository teamplaceEmitterRepository;

    @Value("${sse.connection-time}")
    private Long connectionTimeOut;

    public SseEmitter subscribe(final Long teamPlaceId, final MemberEmailDto memberEmailDto, final String lastEventId) {

        final Long memberId = memberRepository.findIdByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException(memberEmailDto.email()))
                .id();

        final TeamPlaceEmitterId emitterId = TeamPlaceEmitterId.of(teamPlaceId, memberId);
        final SseEmitters emitter = teamplaceEmitterRepository.save(emitterId, new SseEmitter(connectionTimeOut));

        final TeamPlaceConnectedEvent dummyEvent = TeamPlaceConnectedEvent.of(teamPlaceId, memberId);
        final TeamPlaceEventId dummyEventId = TeamPlaceEventId.of(teamPlaceId, dummyEvent.getEventName());
        emitter.sendEvent(dummyEventId, dummyEvent);

        log.info("SSE 연결 생성 {}", emitterId);
        return emitter.getSingleEmitter();
    }
}
