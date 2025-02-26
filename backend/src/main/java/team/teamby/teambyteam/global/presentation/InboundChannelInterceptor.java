package team.teamby.teambyteam.global.presentation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import team.teamby.teambyteam.auth.exception.AuthenticationException;
import team.teamby.teambyteam.auth.jwt.JwtAccessTokenManager;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.MemberTeamPlaceRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberNotFoundException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceAccessForbiddenException;

import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Component
public final class InboundChannelInterceptor implements ChannelInterceptor {

    private static final String PREFIX_BEARER = "Bearer ";

    private final JwtAccessTokenManager jwtAccessTokenManager;
    private final MemberRepository memberRepository;
    private final MemberTeamPlaceRepository memberTeamPlaceRepository;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        final StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        final String authorizationHeader = accessor.getFirstNativeHeader("Authorization");
        final String accessToken = extractAccessToken(authorizationHeader);

        if (Objects.equals(StompCommand.CONNECT, accessor.getCommand())) {
            final String email = jwtAccessTokenManager.parseEmail(accessToken);
            validateMemberExist(email);
            return message;
        }

        if (Objects.equals(StompCommand.SUBSCRIBE, accessor.getCommand()) || Objects.equals(StompCommand.SEND, accessor.getCommand())) {
            final String destination = accessor.getDestination();
            final Long teamplaceId = Long.parseLong(Objects.requireNonNull(destination).substring(destination.lastIndexOf('/') + 1));
            isParticipatedInTeamPlace(accessToken, teamplaceId);
            return message;
        }

        return null;
    }

    private String extractAccessToken(final String authorizationHeader) {
        if (StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith(PREFIX_BEARER)) {
            return authorizationHeader.substring(PREFIX_BEARER.length());
        }
        final String logMessage = "인증 실패(액세스 토큰 추출 실패) - 토큰 : " + authorizationHeader;
        throw new AuthenticationException.FailAuthenticationException(logMessage);
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

    private void isParticipatedInTeamPlace(final String token, final Long teamPlaceId) {
        final String email = jwtAccessTokenManager.parseEmail(token);

        if (hasNotMemberInTeamPlace(teamPlaceId, email)) {
            throw new TeamPlaceAccessForbiddenException(teamPlaceId, email);
        }
    }

    private boolean hasNotMemberInTeamPlace(final Long teamPlaceId, final String email) {
        final Long memberId = memberRepository.findIdByEmail(new Email(email))
                .orElseThrow(() -> new MemberNotFoundException(email))
                .id();

        return memberTeamPlaceRepository.findByTeamPlaceIdAndMemberId(teamPlaceId, memberId)
                .isEmpty();
    }
}
