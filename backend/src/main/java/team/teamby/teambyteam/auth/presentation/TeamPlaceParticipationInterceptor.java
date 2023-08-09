package team.teamby.teambyteam.auth.presentation;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import team.teamby.teambyteam.auth.jwt.JwtTokenExtractor;
import team.teamby.teambyteam.auth.jwt.JwtTokenProvider;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.util.Map;

@Component
@RequiredArgsConstructor
public final class TeamPlaceParticipationInterceptor implements HandlerInterceptor {

    private final JwtTokenExtractor jwtTokenExtractor;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) throws Exception {
        final String token = jwtTokenExtractor.extractAccessToken(request);
        final String email = jwtTokenProvider.extractEmailFromAccessToken(token);
        final Map<String, String> pathVariables = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        final Long teamPlaceId = Long.parseLong(pathVariables.get("teamPlaceId"));

        if (hasNotMemberInTeamPlace(teamPlaceId, email)) {
            throw new TeamPlaceException.TeamPlaceAccessForbidden();
        }
        return true;
    }

    private boolean hasNotMemberInTeamPlace(final Long teamPlaceId, final String email) {
        final Member member = memberRepository.findByEmail(new Email(email))
                .orElseThrow(TeamPlaceException.NotFoundException::new);
        return !member.isMemberOf(teamPlaceId);
    }
}
