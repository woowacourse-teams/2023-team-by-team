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
import team.teamby.teambyteam.member.domain.MemberTeamPlace;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.util.Base64;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public final class TeamPlaceInterceptor implements HandlerInterceptor {

    private static final String PREFIX_BEARER = "Bearer ";
    private static final String EMAIL_KEY = "email";

    private final MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        final String token = extractToken(request);
        final String email = extractEmailFromToken(token);
        Map<String, String> pathVariables = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);

        final Long teamPlaceId = Long.parseLong(pathVariables.get("teamPlaceId"));
        final boolean notExistByTeamPlaceId = isNotExistByTeamPlaceId(teamPlaceId);
        if (notExistByTeamPlaceId) {
            throw new TeamPlaceException.NotFoundException("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
        }

        final List<MemberTeamPlace> memberTeamPlaces = memberTeamPlaceRepository.findMemberTeamPlacesByMemberEmail(new Email(email));
        if (noneMatchedTeamPlace(teamPlaceId, memberTeamPlaces)) {
            throw new TeamPlaceException.TeamPlaceAccessForbidden("접근할 수 없는 팀플레이스입니다.");
        }

        return true;
    }

    private boolean isNotExistByTeamPlaceId(final Long teamPlaceId) {
        return !memberTeamPlaceRepository.existsByTeamPlaceId(teamPlaceId);
    }

    private boolean noneMatchedTeamPlace(final Long teamPlaceId, final List<MemberTeamPlace> memberHasTeamPlaces) {
        return memberHasTeamPlaces.stream()
                .noneMatch(memberTeamPlace -> memberTeamPlace
                        .getTeamPlace()
                        .getId()
                        .equals(teamPlaceId));
    }

    private String extractToken(HttpServletRequest request) {
        final String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);
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
