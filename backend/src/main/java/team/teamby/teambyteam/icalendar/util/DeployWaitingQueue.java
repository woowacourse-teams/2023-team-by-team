package team.teamby.teambyteam.icalendar.util;

import org.springframework.stereotype.Component;
import team.teamby.teambyteam.common.util.UniqueBlockingQueue;

@Component
public class DeployWaitingQueue {

    private final int QUEUE_CAPACITY = 100;

    private final UniqueBlockingQueue<Long> queue;

    public DeployWaitingQueue() {
        this.queue = new UniqueBlockingQueue<>(QUEUE_CAPACITY);
    }

    public boolean add(final Long teamPlaceId) {
        return queue.add(teamPlaceId);
    }

    public Long take() throws InterruptedException {
        return queue.take();
    }
}
