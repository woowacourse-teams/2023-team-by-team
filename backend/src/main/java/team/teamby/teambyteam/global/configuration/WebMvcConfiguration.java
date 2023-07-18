package team.teamby.teambyteam.global.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import team.teamby.teambyteam.member.configuration.MemberArgumentResolver;
import team.teamby.teambyteam.member.configuration.MemberInterceptor;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {

    private final MemberInterceptor memberInterceptor;

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new MemberArgumentResolver());
    }

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        registry.addInterceptor(memberInterceptor)
                .addPathPatterns("/**");
    }
}
