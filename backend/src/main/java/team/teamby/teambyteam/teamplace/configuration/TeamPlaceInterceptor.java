package team.teamby.teambyteam.teamplace.configuration;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.util.Base64;
import java.util.Map;

@Component
@RequiredArgsConstructor
public final class TeamPlaceInterceptor implements HandlerInterceptor {

    private static final String PREFIX_BEARER = "Bearer ";
    private static final String EMAIL_KEY = "email";

    private final TeamPlaceRepository teamPlaceRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        final String token = extractToken(request);
        final String email = extractEmailFromToken(token);
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

    private String extractToken(HttpServletRequest request) {
        final String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(PREFIX_BEARER)) {
            return bearerToken.substring(PREFIX_BEARER.length());
        }
        throw new MemberException.UnSupportAuthenticationException();
    }

    public String extractEmailFromToken(String token) {
        final String payLoad = token.split("\\.")[1];
        final String decodedPayLoad = new String(Base64.getDecoder().decode(payLoad));
        final JacksonJsonParser jacksonJsonParser = new JacksonJsonParser();
        return (String) jacksonJsonParser.parseMap(decodedPayLoad)
                .get(EMAIL_KEY);
    }
}
