package team.teamby.teambyteam.icalendar.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

@Configuration
@EnableScheduling
@EnableAsync
public class IcsPublisherSchedulingConfig {

    public static final int ICS_PUBLISHER_CORE_POOL_SIZE = 5;

    @Bean("icsPublisherSchedulerThreadPool")
    public Executor icsPublisherSchedulingThreadPool() {
        final ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(ICS_PUBLISHER_CORE_POOL_SIZE);
        executor.setMaxPoolSize(ICS_PUBLISHER_CORE_POOL_SIZE);
        executor.setQueueCapacity(0);
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.DiscardPolicy());
        executor.setThreadNamePrefix("ics-publisher-scheduler-");
        executor.initialize();
        return executor;
    }

}
