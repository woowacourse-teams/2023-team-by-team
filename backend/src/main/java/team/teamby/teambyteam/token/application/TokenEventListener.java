package team.teamby.teambyteam.token.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.member.application.event.MemberLeaveEvent;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.token.domain.TokenRepository;

@Slf4j
@Component
@RequiredArgsConstructor
public class TokenEventListener {

    private final MemberRepository memberRepository;
    private final TokenRepository tokenRepository;

    @EventListener
    public void deleteToken(final MemberLeaveEvent memberLeaveEvent) {
        Member member = memberLeaveEvent.member();
        tokenRepository.deleteByMember(member);
        memberRepository.delete(member);

        log.info("토큰 삭제 By 사용자 회원 탈퇴 이벤트 Listen - 회원 이메일 : {}", member.getEmail().getValue());
        log.info("사용자 회원 탈퇴 - 회원 이메일 : {}", member.getEmail().getValue());
    }
}
