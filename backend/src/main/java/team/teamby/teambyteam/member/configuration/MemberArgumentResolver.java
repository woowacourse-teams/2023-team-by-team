package team.teamby.teambyteam.member.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import team.teamby.teambyteam.auth.jwt.JwtTokenProvider;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class MemberArgumentResolver implements HandlerMethodArgumentResolver, org.springframework.messaging.handler.invocation.HandlerMethodArgumentResolver {

    private static final int TOKEN_INDEX = 1;

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthPrincipal.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, Message<?> message) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        return resolve(Objects.requireNonNull(accessor.getFirstNativeHeader(HttpHeaders.AUTHORIZATION)));
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        return resolve(Objects.requireNonNull(webRequest.getHeader(HttpHeaders.AUTHORIZATION)));
    }

    private MemberEmailDto resolve(String authorizationHeader) {
        final String jwtToken = authorizationHeader.split(" ")[TOKEN_INDEX];
        String email = jwtTokenProvider.extractEmailFromAccessToken(jwtToken);
        return new MemberEmailDto(email);
    }
}
