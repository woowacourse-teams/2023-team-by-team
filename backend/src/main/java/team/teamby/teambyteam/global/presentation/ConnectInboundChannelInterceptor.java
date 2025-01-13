package team.teamby.teambyteam.global.presentation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import team.teamby.teambyteam.auth.exception.AuthenticationException;
import team.teamby.teambyteam.auth.jwt.JwtTokenProvider;

@Slf4j
@RequiredArgsConstructor
@Component
public final class ConnectInboundChannelInterceptor implements ChannelInterceptor {

    private static final String PREFIX_BEARER = "Bearer ";

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        final StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if (!StompCommand.CONNECT.equals(accessor.getCommand())) {
            return message;
        }

        final String token = extractAccessToken(accessor.getFirstNativeHeader(HttpHeaders.AUTHORIZATION));
        try {
            jwtTokenProvider.extractEmailFromAccessToken(token);
            return message;
        } catch (RuntimeException ignored) {
            log.error("socket not connected.{}", ignored.getMessage());
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
}
