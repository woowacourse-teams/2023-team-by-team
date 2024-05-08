package team.teamby.teambyteam.icalendar.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
@Profile({"prod", "dev", "local"})
public class IcalendarPublishEventListenerThreadPoolConfig {

    @Bean("icalendarEventListenerAsyncExecutor")
    public Executor icalendarEventListenerAsyncExecutor() {
        final ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("icalendar-event-listener-");
        executor.initialize();
        return executor;
    }

}
