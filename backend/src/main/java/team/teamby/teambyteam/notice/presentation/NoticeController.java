package team.teamby.teambyteam.notice.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.notice.application.NoticeService;
import team.teamby.teambyteam.notice.application.dto.NoticeRegisterRequest;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/team-place")
public class NoticeController {

    private final NoticeService noticeService;
    private final MemberRepository memberRepository;

    @PostMapping(value = "/{teamPlaceId}/feed/notice")
    public ResponseEntity<Void> Register(
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestBody @Valid final NoticeRegisterRequest noticeRegisterRequest,
            @PathVariable final Long teamPlaceId) {

        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberException.MemberNotFoundException::new);
        final Long registeredId = noticeService.register(noticeRegisterRequest, teamPlaceId, member.getId());
        final URI location = URI.create("/api/team-place/" + teamPlaceId + "/feed/threads/notice/" + registeredId);

        return ResponseEntity.created(location).build();
    }
}
