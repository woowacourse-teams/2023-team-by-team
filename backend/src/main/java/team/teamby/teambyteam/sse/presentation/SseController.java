package team.teamby.teambyteam.sse.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
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

    private final SseSubscribeService sseSubscribeService;

    @GetMapping(value = "/team-place/{teamPlaceId}/subscribe", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<SseEmitter> connect(
            @PathVariable final Long teamPlaceId,
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestHeader(value = "Last-Event-ID", required = false, defaultValue = SseSubscribeService.DEFAULT_EVENT_ID) final String lastEventId
    ) {
        final SseEmitter emitter = sseSubscribeService.subscribe(teamPlaceId, memberEmailDto, lastEventId);
        return ResponseEntity
                .ok()
                .header(NGINX_X_ACCEL_BUFFERING_HEADER, NO)
                .body(emitter);
    }
}
