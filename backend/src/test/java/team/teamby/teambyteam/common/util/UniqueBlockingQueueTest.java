package team.teamby.teambyteam.common.util;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class UniqueBlockingQueueTest {

    private static final int INITIAL_CAPACITY = 10;

    private UniqueBlockingQueue<Integer> uniqueBlockingQueue;

    @BeforeEach
    void setUp() {
        uniqueBlockingQueue = new UniqueBlockingQueue<>(INITIAL_CAPACITY);
    }

    @Nested
    @DisplayName("add 메서드 테스트")
    class AddTest {

        @Test
        @DisplayName("중복된 값 추가시 false, 중복되지 않은 값 추가시 true 반환")
        void testAdd() {
            // given

            // when
            boolean firstAddResult = uniqueBlockingQueue.add(1);
            boolean secondAddResult = uniqueBlockingQueue.add(1);
            boolean thirdAddResult = uniqueBlockingQueue.add(2);

            // then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(firstAddResult).isTrue();
                softly.assertThat(secondAddResult).isFalse();
                softly.assertThat(thirdAddResult).isTrue();
            });
        }

        @Test
        @DisplayName("capacity 초과시 IllegalStateException 발생")
        void testAddBeyondCapacity() {
            // given
            for (int i = 0; i < INITIAL_CAPACITY; i++) {
                uniqueBlockingQueue.add(i);
            }

            // when
            // then
            assertThatThrownBy(() -> uniqueBlockingQueue.add(INITIAL_CAPACITY))
                    .isInstanceOf(IllegalStateException.class);
        }
    }

    @Nested
    @DisplayName("take 메서드 테스트")
    class TakeTest {

        @Test
        @DisplayName("순서대로 값 가져오기")
        void testTake() throws InterruptedException {
            // given
            uniqueBlockingQueue.add(1);
            uniqueBlockingQueue.add(1);
            uniqueBlockingQueue.add(2);

            // when
            final Integer expectedFirst = uniqueBlockingQueue.take();
            final Integer expectedSecond = uniqueBlockingQueue.take();

            // then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(expectedFirst).isEqualTo(1);
                softly.assertThat(expectedSecond).isEqualTo(2);
            });
        }

        @Test
        @DisplayName("빈 큐에서 take 시 대기")
        void testTakeBlocksWhenEmpty() throws InterruptedException {
            // given
            Thread thread = new Thread(() -> {
                try {
                    uniqueBlockingQueue.take();
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });

            // when
            thread.start();
            TimeUnit.MILLISECONDS.sleep(100);

            // then
            assertThat(thread.getState()).isEqualTo(Thread.State.WAITING);

            // Clean up
            thread.interrupt();
        }

        @Test
        @DisplayName("대기중인 큐에 값 추가시 take가 정상적으로 작동")
        void testTakeValueWhenElementIsAdded() throws InterruptedException {
            // given
            AtomicInteger value = new AtomicInteger(0);
            Thread thread = new Thread(() -> {
                try {
                    final Integer takenValue = uniqueBlockingQueue.take();
                    value.set(takenValue);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
            thread.start();
            TimeUnit.MILLISECONDS.sleep(100);
            final Thread.State waitingState = thread.getState();

            // when
            final Integer addedValue = 10;
            uniqueBlockingQueue.add(addedValue);

            // then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(waitingState).isEqualTo(Thread.State.WAITING);
                softly.assertThat(thread.getState()).isEqualTo(Thread.State.TERMINATED);
                softly.assertThat(value.get()).isEqualTo(addedValue);
            });
        }
    }

    @Nested
    @DisplayName("poll 메서드 테스트")
    class PollTest {

        @Test
        @DisplayName("큐가 비어있지 않고 timeout 동안 poll 메서드가 호출될 때")
        void testPollWhenQueueIsNotEmpty() throws InterruptedException {
            // given
            final int value = 1;
            uniqueBlockingQueue.add(value);

            // when
            Optional<Integer> result = uniqueBlockingQueue.poll(1, TimeUnit.SECONDS);

            // then
            assertThat(result).isPresent().contains(value);
        }

        @Test
        @DisplayName("큐가 비어 있고 timeout 동안 poll 메서드가 호출될 때")
        void testPollWhenQueueIsEmpty() throws InterruptedException {
            // when
            Optional<Integer> result = uniqueBlockingQueue.poll(1, TimeUnit.SECONDS);

            // then
            assertThat(result).isNotPresent();
        }

        @Test
        @DisplayName("큐가 비어 있고 timeout 동안 poll 메서드가 호출되고 timeout 전에 요소가 추가될 때")
        void testPollWhenElementIsAddedBeforeTimeout() throws InterruptedException {
            // given
            final int value = 1;
            Thread thread = new Thread(() -> {
                try {
                    TimeUnit.MILLISECONDS.sleep(500);
                    uniqueBlockingQueue.add(value);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            });
            thread.start();

            // when
            Optional<Integer> result = uniqueBlockingQueue.poll(1, TimeUnit.SECONDS);

            // then
            assertThat(result).isPresent().contains(value);
        }
    }
}
