package team.teamby.teambyteam.auth.presentation;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import team.teamby.teambyteam.auth.exception.AuthenticationException;
import team.teamby.teambyteam.auth.jwt.JwtTokenExtractor;
import team.teamby.teambyteam.auth.jwt.JwtTokenProvider;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;

@RequiredArgsConstructor
@Component
public final class MemberInterceptor implements HandlerInterceptor {

    private final JwtTokenExtractor jwtTokenExtractor;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
        final String accessToken = jwtTokenExtractor.extractAccessToken(request);
        String email = jwtTokenProvider.extractEmailFromAccessToken(accessToken);
        validateMemberExist(email);
        return true;
    }

    private void validateMemberExist(final String email) {
        if (notExistsByEmail(email)) {
            String logMessage = "인증 실패(존재하지 않는 멤버) - 회원 이메일 : " + email;
            throw new AuthenticationException.FailAuthenticationException(logMessage);
        }
    }

    private boolean notExistsByEmail(final String email) {
        return !memberRepository.existsByEmail(new Email(email));
    }
}
