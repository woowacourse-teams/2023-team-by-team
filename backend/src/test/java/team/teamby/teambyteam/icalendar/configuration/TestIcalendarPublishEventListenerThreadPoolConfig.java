package team.teamby.teambyteam.icalendar.configuration;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@TestConfiguration
@EnableAsync
@Profile("test")
public class TestIcalendarPublishEventListenerThreadPoolConfig {

    @Bean("icalendarEventListenerAsyncExecutor")
    public Executor icalendarEventListenerAsyncExecutor() {
        final ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(5);
        executor.setQueueCapacity(10);
        executor.setThreadNamePrefix("icalendar-event-listener-");
        executor.initialize();
        return executor;
    }
}
