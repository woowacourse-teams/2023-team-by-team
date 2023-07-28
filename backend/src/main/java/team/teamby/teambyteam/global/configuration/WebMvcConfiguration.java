package team.teamby.teambyteam.global.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import team.teamby.teambyteam.member.configuration.MemberArgumentResolver;
import team.teamby.teambyteam.auth.presentation.MemberInterceptor;
import team.teamby.teambyteam.auth.presentation.TeamPlaceInterceptor;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

    private final MemberInterceptor memberInterceptor;
    private final TeamPlaceInterceptor teamPlaceInterceptor;

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new MemberArgumentResolver());
    }

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        registry.addInterceptor(memberInterceptor)
                .order(1)
                .addPathPatterns("/api/**");
        registry.addInterceptor(teamPlaceInterceptor)
                .order(2)
                .addPathPatterns("/**/team-place/**");
    }
}
