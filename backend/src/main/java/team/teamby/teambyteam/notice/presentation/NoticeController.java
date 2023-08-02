package team.teamby.teambyteam.notice.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.notice.application.NoticeService;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;
import team.teamby.teambyteam.notice.application.dto.NoticeResponse;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/team-place")
public class NoticeController {

    private final NoticeService noticeService;

    @PostMapping("/{teamPlaceId}/feed/notice")
    public ResponseEntity<Void> registerNotice(
            @RequestBody @Valid final NoticeRegisterRequest reqeust,
            @PathVariable final Long teamPlaceId,
            @AuthPrincipal final MemberEmailDto memberEmailDto
    ) {
        final Long registeredId = noticeService.register(reqeust, teamPlaceId, memberEmailDto);
        final URI location = URI.create("/api/team-place/" + teamPlaceId + "/feed/threads/notice/" + registeredId);

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{teamPlaceId}/feed/notice/recent")
    public ResponseEntity<Object> findNotice(@PathVariable final Long teamPlaceId) {
        final NoticeResponse noticeResponse = noticeService.findMostRecentNotice(teamPlaceId);

        if (noticeResponse == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(noticeResponse);
    }
}
