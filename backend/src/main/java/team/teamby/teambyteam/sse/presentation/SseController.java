package team.teamby.teambyteam.sse.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.sse.application.SseSubscribeService;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class SseController {

    private static final String NGINX_X_ACCEL_BUFFERING_HEADER = "X-Accel-Buffering";
    private static final String NO = "no";
    private static final String KEEP_ALIVE = "Keep-Alive";
    private static final String TIMEOUT = "timeout=";
    private static final int TIMEOUT_VALUE = 5*60;
    private static final String CONNECTION = "Connection";
    private static final String CONNECTION_KEEP_ALIVE = "keep-alive";

    private final SseSubscribeService sseSubscribeService;

    @GetMapping(value = "/team-place/{teamPlaceId}/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect(
            @PathVariable final Long teamPlaceId,
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestParam(value = "lastEventID", required = false, defaultValue = SseSubscribeService.DEFAULT_EVENT_ID) final String lastEventId
    ) {
        final SseEmitter emitter = sseSubscribeService.subscribe(teamPlaceId, memberEmailDto, lastEventId);
        return ResponseEntity
                .ok()
                .header(NGINX_X_ACCEL_BUFFERING_HEADER, NO)
                .header(KEEP_ALIVE, TIMEOUT + TIMEOUT_VALUE)
                .header(CONNECTION, CONNECTION_KEEP_ALIVE)
                .body(emitter);
    }
}
