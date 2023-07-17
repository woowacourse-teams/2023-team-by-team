package team.teamby.teambyteam.member.configuration;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;

import java.util.Base64;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public final class MemberInterceptor implements HandlerInterceptor {

    private static final String EMAIL_KEY = "email";
    private static final String PREFIX_BEARER = "Bearer ";

    private final MemberRepository memberRepository;

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
        final String token = extractToken(request);
        String email = extractEmailFromToken(token);
        final Optional<Member> member = memberRepository.findByEmail(new Email(email));
        if (member.isEmpty()) {
            throw new MemberException.MemberNotFoundException("멤버 조회 실패");
        }
        return true;
    }

    private String extractToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(PREFIX_BEARER)) {
            return bearerToken.substring(PREFIX_BEARER.length());
        }
        throw new MemberException.UnSupportAuthenticationException("지원하지 않는 인증 방식입니다.");
    }

    public String extractEmailFromToken(String token) {
        final String payLoad = token.split("\\.")[1];
        final String decodedPayLoad = new String(Base64.getDecoder().decode(payLoad));
        final JacksonJsonParser jacksonJsonParser = new JacksonJsonParser();
        return (String) jacksonJsonParser.parseMap(decodedPayLoad)
                .get(EMAIL_KEY);
    }
}
