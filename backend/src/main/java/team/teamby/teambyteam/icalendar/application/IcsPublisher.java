package team.teamby.teambyteam.icalendar.application;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.icalendar.util.DeployWaitingQueue;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class IcsPublisher {

    public static final long POLL_TIMEOUT = 10;
    public static final TimeUnit POLL_TIMEOUT_UNIT = TimeUnit.SECONDS;

    private final DeployWaitingQueue queue;
    private final IcalendarPublishService icalendarPublishService;

    public IcsPublisher(
            final DeployWaitingQueue deployWaitingQueue,
            final IcalendarPublishService icalendarPublishService
    ) {
        this.queue = deployWaitingQueue;
        this.icalendarPublishService = icalendarPublishService;
    }

    public void process() {
        try {
            final Optional<Long> teamPlaceId = queue.poll(POLL_TIMEOUT, POLL_TIMEOUT_UNIT);
            if (teamPlaceId.isPresent()) {
                log.info("IcsPublisher - teamPlaceId : {}", teamPlaceId.get());
                icalendarPublishService.updateIcalendar(teamPlaceId.get());
            }
        } catch (InterruptedException e) {
            log.error("IcsPublisher interrupted - caused by DeployWaitingQueue interrupted", e);
            Thread.currentThread().interrupt();
        }
    }
}
