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

/**
 * 1. AccessToken만 요청으로 들어왔을 때
 * - 1-1. 검증 (만료, 변조) -> 401에 만료 : 만료되었습니다, 변조/클레임 누락 -> 인증 실패 메시지
 * - 1-2. DB에 있는지 확인 -> 없으면 Member Not Found 404
 * - 1-3. 앞 과정 통과하면 인터셉터 통과 (인증 성공)
 * <p>
 * 2. RefreshToken만 요청으로 들어왔을 때
 * - 1-1. 검증 (만료, 변조) -> 401에 만료 : 만료되었습, 변조/클레임 누락 -> 인증 실패 메시지
 * - DB에 RefreshToken 만료 기간이 지났을 때 자동 삭제를 해야할까?
 * - 자동 삭제를 안하면 요청 시에만 만료됐을 때 삭제해서 요청을 안하면 만료된 토큰 데이터가 쌓임. (일단 자동삭제 안하게 구현)
 * - 1-2. 인증 성공 : 응답 헤더에 AccessToken, RefreshToken을 재발급
 */

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
            throw new MemberException.MemberNotFoundException();
        }
    }

    private boolean notExistsByEmail(final String email) {
        return !memberRepository.existsByEmail(new Email(email));
    }
}
