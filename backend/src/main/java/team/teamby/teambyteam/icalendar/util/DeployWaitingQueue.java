package team.teamby.teambyteam.icalendar.util;

import org.springframework.stereotype.Component;
import team.teamby.teambyteam.common.util.UniqueBlockingQueue;

import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

@Component
public class DeployWaitingQueue {

    private static final int CREATE_QUEUE_CAP = 50;
    private static final int UPDATE_QUEUE_CAP = 100;

    private static final int CREATE_WEIGHT = 3;
    private static final int UPDATE_WEIGHT = 1;

    private final Lock addLock = new ReentrantLock();
    private final Lock pollCountLock = new ReentrantLock();

    private final UniqueBlockingQueue<Long> createQueue;
    private final UniqueBlockingQueue<Long> updateQueue;

    private int currentCount = 0;

    public DeployWaitingQueue() {
        this.createQueue = new UniqueBlockingQueue<>(CREATE_QUEUE_CAP);
        this.updateQueue = new UniqueBlockingQueue<>(UPDATE_QUEUE_CAP);
    }

    public boolean addCreate(final Long teamPlaceId) {
        addLock.lock();
        try {
            return createQueue.add(teamPlaceId);
        } finally {
            addLock.unlock();
        }
    }

    public boolean addUpdate(final Long teamPlaceId) {
        addLock.lock();
        try {
            if (createQueue.contains(teamPlaceId)) {
                return false;
            }
            return updateQueue.add(teamPlaceId);
        } finally {
            addLock.unlock();
        }
    }

    /**
     * 배포 대기중인 {@code teamPlaceId}를 반환. 큐가 비어있으면 {@code POLL_TIMEOUT } {@code POLL_TIMEOUT_UNIT}시간 동안 대기.
     * {@link #createQueue}와 {@link #updateQueue}의 가중치를 고려하여 반환하지만, 만약에 빈 큐가 있으면 다른 큐에서 반환 시도. (가중치 무시, 우선순위 : {@code createQueue} > {@code updateQueue})
     * 만약 {@code createQueue}만 비어있다면 {@code updateQueue}에서 반환 또는 반환 대기.
     * 만약 {@code updateQueue}만 비어있거나, 두 큐가 모두 비어있다면 {@code createQueue}에서 반환 또는 반환 대기.
     * 대기시간동안 큐가 비어있으면 빈 {@code Optional}을 반환.
     *
     * @return 대기중인 {@code teamPlaceId} 또는 빈 {@code Optional}
     * @throws InterruptedException 대기하는 동안 중단된 경우
     */
    public Optional<Long> poll(final long timeout, final TimeUnit timeUnit) throws InterruptedException {
        if (updateQueue.isEmpty()) {
            return createQueue.poll(timeout, timeUnit);
        }
        if (createQueue.isEmpty()) {
            return updateQueue.poll(timeout, timeUnit);
        }

        boolean isCreateTurn;
        pollCountLock.lock();
        try {
            isCreateTurn = currentCount < CREATE_WEIGHT;
            currentCount++;
            if (currentCount >= CREATE_WEIGHT + UPDATE_WEIGHT) {
                currentCount = 0;
            }
        } finally {
            pollCountLock.unlock();
        }

        if (isCreateTurn) {
            return createQueue.poll(timeout, timeUnit);
        }
        return updateQueue.poll(timeout, timeUnit);
    }
}
