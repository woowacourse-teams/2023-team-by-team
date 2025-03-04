package team.teamby.teambyteam.auth.presentation;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import team.teamby.teambyteam.auth.jwt.JwtAccessTokenManager;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberNotFoundException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceAccessForbiddenException;

import java.util.Map;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public final class TeamPlaceParticipationInterceptor implements HandlerInterceptor {

    private static final String PATH_VARIABLE_KEY = "teamPlaceId";

    private final JwtAccessTokenManager jwtAccessTokenManager;
    private final MemberRepository memberRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response, final Object handler) {
        final String accessToken = jwtAccessTokenManager.parseToken(request.getHeader(HttpHeaders.AUTHORIZATION));
        String email = jwtAccessTokenManager.parseEmail(accessToken);
        final Map<String, String> pathVariables = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        if (Objects.isNull(pathVariables.get(PATH_VARIABLE_KEY))) {
            return true;
        }
        final Long teamPlaceId = Long.parseLong(pathVariables.get(PATH_VARIABLE_KEY));

        if (hasNotMemberInTeamPlace(teamPlaceId, email)) {
            throw new TeamPlaceAccessForbiddenException(teamPlaceId, email);
        }
        return true;
    }

    private boolean hasNotMemberInTeamPlace(final Long teamPlaceId, final String email) {
        final Long memberId = memberRepository.findIdByEmail(new Email(email))
                .orElseThrow(() -> new MemberNotFoundException(email))
                .id();

        return memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(teamPlaceId, memberId)
                .isEmpty();
    }
}
