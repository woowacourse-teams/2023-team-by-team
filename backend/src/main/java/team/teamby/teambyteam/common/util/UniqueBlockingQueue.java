package team.teamby.teambyteam.common.util;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

public class UniqueBlockingQueue<E> {

    private final Set<E> set;
    private final BlockingQueue<E> queue;

    public UniqueBlockingQueue(final int capacity) {
        this.set = new HashSet<>(capacity);
        this.queue = new LinkedBlockingQueue<>(capacity);
    }

    /**
     * 지정된 요소를 이 큐에 추가. 이미 존재하지 않는 경우에만 추가.
     * 이 큐가 이미 요소를 포함하고 있는 경우, 호출은 큐를 변경하지 않고 false를 반환.
     *
     * @param e 이 큐에 추가될 요소
     * @return 큐가 지정된 요소를 이미 포함하고 있지 않아 추가된 경우 {@code true}, 그렇지 않으면 {@code false}
     * @throws IllegalStateException capacity 제한으로 인해 현재 요소를 추가할 수 없는 경우
     */
    public boolean add(E e) {
        if (set.add(e)) {
            try {
                return queue.add(e);
            } catch (final IllegalStateException ex) {
                set.remove(e);
                throw ex;
            }
        }
        return false;
    }

    /**
     * 이 큐의 헤드를 검색하고 제거. 필요한 경우 요소가 사용 가능해질 때까지 대기.
     *
     * @return 이 큐의 헤드
     * @throws InterruptedException 대기하는 동안 중단된 경우
     */
    public E take() throws InterruptedException {
        E e = queue.take();
        set.remove(e);
        return e;
    }

    /**
     * 이 큐의 헤드를 검색하고 제거. 필요한 경우 요소가 사용 가능해질 때까지 지정된 시간 동안 대기.
     * 지정된 시간 내에 요소가 사용 가능하지 않은 경우, 빈 Optional을 반환.
     *
     * @param timeout 대기할 최대 시간
     * @param unit timeout의 시간 단위
     * @return 이 큐의 헤드를 포함하는 Optional, 또는 지정된 시간 내에 요소가 사용 가능하지 않은 경우 빈 Optional
     * @throws InterruptedException 대기하는 동안 중단된 경우
     */
    public Optional<E> poll(long timeout, TimeUnit unit) throws InterruptedException {
        E e = queue.poll(timeout, unit);
        if (e != null) {
            set.remove(e);
            return Optional.of(e);
        }
        return Optional.empty();
    }

    public boolean contains(E e) {
        return set.contains(e);
    }

    public boolean isEmpty() {
        return queue.isEmpty();
    }
}
