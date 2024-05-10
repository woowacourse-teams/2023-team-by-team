package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class IcsPublisherThreadScheduling {

    private final IcsPublisher icsPublisher;

    // poll waiting time : 10000ms, run on 5 threads
    // waiting for each second
    @Scheduled(fixedRate = 1000)
    @Async("icsPublisherSchedulerThreadPool")
    public void run() {
        icsPublisher.process();
    }
}
