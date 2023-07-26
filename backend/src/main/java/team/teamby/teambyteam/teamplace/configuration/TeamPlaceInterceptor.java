package team.teamby.teambyteam.teamplace.configuration;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import team.teamby.teambyteam.global.configuration.JwtTokenExtractor;
import team.teamby.teambyteam.global.configuration.JwtTokenProvider;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.util.Map;

@Component
@RequiredArgsConstructor
public final class TeamPlaceInterceptor implements HandlerInterceptor {

    private final JwtTokenExtractor jwtTokenExtractor;
    private final JwtTokenProvider jwtTokenProvider;
    private final TeamPlaceRepository teamPlaceRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        final String token = jwtTokenExtractor.extractToken(request);
        final String email = jwtTokenProvider.extractEmailFromToken(token);
        Map<String, String> pathVariables = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        final Long teamPlaceId = Long.parseLong(pathVariables.get("teamPlaceId"));

        if (hasNotMemberInTeamPlace(teamPlaceId, email)) {
            throw new TeamPlaceException.TeamPlaceAccessForbidden();
        }
        return true;
    }

    private boolean hasNotMemberInTeamPlace(final Long teamPlaceId, final String email) {
        final TeamPlace teamPlace = teamPlaceRepository.findById(teamPlaceId)
                .orElseThrow(TeamPlaceException.NotFoundException::new);
        return !teamPlace.hasMemberByMemberEmail(new Email(email));
    }
}
