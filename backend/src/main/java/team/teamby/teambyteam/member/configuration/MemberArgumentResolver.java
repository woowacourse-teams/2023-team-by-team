package team.teamby.teambyteam.member.configuration;

import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;

import java.util.Base64;

public class MemberArgumentResolver implements HandlerMethodArgumentResolver {

    private static final String EMAIL_KEY = "email";
    private static final int PAYLOAD_INDEX = 1;
    private static final int TOKEN_INDEX = 1;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthPrincipal.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        final String authorization = webRequest.getHeader(HttpHeaders.AUTHORIZATION);
        final String jwtToken = authorization.split(" ")[TOKEN_INDEX];
        final String email = extractEmailFromToken(jwtToken);
        return new MemberEmailDto(email);
    }

    private String extractEmailFromToken(final String jwtToken) {
        final String payLoad = jwtToken.split("\\.")[PAYLOAD_INDEX];
        final String decodedPayLoad = new String(Base64.getDecoder().decode(payLoad));
        final JacksonJsonParser jacksonJsonParser = new JacksonJsonParser();
        return (String) jacksonJsonParser.parseMap(decodedPayLoad)
                .get(EMAIL_KEY);
    }
}
