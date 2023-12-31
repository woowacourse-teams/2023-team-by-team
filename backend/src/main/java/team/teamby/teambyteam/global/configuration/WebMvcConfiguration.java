package team.teamby.teambyteam.global.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import team.teamby.teambyteam.auth.jwt.JwtTokenProvider;
import team.teamby.teambyteam.auth.presentation.MemberInterceptor;
import team.teamby.teambyteam.auth.presentation.TeamPlaceParticipationInterceptor;
import team.teamby.teambyteam.member.configuration.MemberArgumentResolver;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

    private final MemberInterceptor memberInterceptor;
    private final TeamPlaceParticipationInterceptor teamPlaceParticipationInterceptor;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new MemberArgumentResolver(jwtTokenProvider));
    }

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        registry.addInterceptor(memberInterceptor)
                .order(1)
                .excludePathPatterns("/api/auth/**/login")
                .excludePathPatterns("/api/auth/code/google")
                .excludePathPatterns("/api/token/reissue")
                .addPathPatterns("/api/**");
        registry.addInterceptor(teamPlaceParticipationInterceptor)
                .order(2)
                .addPathPatterns("/api/**/team-place/{teamPlaceId}/**")
                .addPathPatterns("/api/**/team-places/{teamPlaceId}/**");
    }
}
