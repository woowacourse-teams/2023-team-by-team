package team.teamby.teambyteam.icalendar.configuration;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.core.task.SyncTaskExecutor;

import java.util.concurrent.Executor;

@TestConfiguration
@Profile("test")
public class TestSynchronousTaskExecutorConfig {

    @Bean("icalendarEventListenerAsyncExecutor")
    @Primary
    public Executor executor() {
        return new SyncTaskExecutor();
    }
}
