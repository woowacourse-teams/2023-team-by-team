package team.teamby.teambyteam.auth.presentation;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import team.teamby.teambyteam.auth.jwt.JwtTokenExtractor;
import team.teamby.teambyteam.auth.jwt.JwtTokenProvider;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;

@RequiredArgsConstructor
@Component
public final class MemberInterceptor implements HandlerInterceptor {

    private final JwtTokenExtractor jwtTokenExtractor;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
        final String token = jwtTokenExtractor.extractToken(request);
        final String email = jwtTokenProvider.extractEmailFromToken(token);
        if (notExistsByEmail(email)) {
            throw new MemberException.MemberNotFoundException();
        }
        return true;
    }

    private boolean notExistsByEmail(final String email) {
        return !memberRepository.existsByEmail(new Email(email));
    }
}
