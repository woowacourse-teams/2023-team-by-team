package team.teamby.teambyteam.icalendar.util;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.stream.LongStream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class DeployWaitingQueueTest {

    private static final long FAST_POLL_TIMEOUT = 100L;
    private static final TimeUnit FAST_POLL_TIMEOUT_UNIT = TimeUnit.MILLISECONDS;

    private DeployWaitingQueue deployWaitingQueue;

    @BeforeEach
    void setUp() {
        deployWaitingQueue = new DeployWaitingQueue();
    }

    @Nested
    @DisplayName("addCreate 메서드 테스트")
    class AddCreateTest {

        @Test
        @DisplayName("teamPlaceId 추가시 true 반환")
        void testAddCreate() {
            // given
            final Long teamPlaceId = 1L;

            // when
            boolean addResult = deployWaitingQueue.addCreate(teamPlaceId);

            // then
            assertThat(addResult).isTrue();
        }

        @Test
        @DisplayName("이미 존재하는 teamPlaceId 추가시 false 반환")
        void testAddExistingCreate() {
            // given
            final Long teamPlaceId = 1L;
            deployWaitingQueue.addCreate(teamPlaceId);

            // when
            boolean addResult = deployWaitingQueue.addCreate(teamPlaceId);

            // then
            assertThat(addResult).isFalse();
        }

        @Test
        @DisplayName("cap 초과시 IllegalStateException 발생")
        void testCapException() {
            // given
            for (int i = 0; i < 50; i++) {
                deployWaitingQueue.addCreate((long) i);
            }

            // when
            // then
            assertThatThrownBy(() -> deployWaitingQueue.addCreate(50L))
                    .isInstanceOf(IllegalStateException.class);
        }
    }

    @Nested
    @DisplayName("addUpdate 메서드 테스트")
    class AddUpdateTest {

        @Test
        @DisplayName("teamPlaceId 추가시 true 반환")
        void testAddUpdate() {
            // given
            final Long teamPlaceId = 1L;

            // when
            boolean addResult = deployWaitingQueue.addUpdate(teamPlaceId);

            // then
            assertThat(addResult).isTrue();
        }

        @Test
        @DisplayName("이미 존재하는 teamPlaceId 추가시 false 반환")
        void testAddExistingUpdate() {
            // given
            final Long teamPlaceId = 1L;
            deployWaitingQueue.addUpdate(teamPlaceId);

            // when
            boolean addResult = deployWaitingQueue.addUpdate(teamPlaceId);

            // then
            assertThat(addResult).isFalse();
        }

        @Test
        @DisplayName("teamPlaceId가 createQueue에 존재하는 경우 false 반환")
        void testAddUpdateWhenExistsInCreateQueue() {
            // given
            final Long teamPlaceId = 1L;
            deployWaitingQueue.addCreate(teamPlaceId);

            // when
            boolean addResult = deployWaitingQueue.addUpdate(teamPlaceId);

            // then
            assertThat(addResult).isFalse();
        }

        @Test
        @DisplayName("cap 초과시 IllegalStateException 발생")
        void testCapException() {
            // given
            for (int i = 0; i < 100; i++) {
                deployWaitingQueue.addUpdate((long) i);
            }

            // when
            // then
            assertThatThrownBy(() -> deployWaitingQueue.addUpdate(100L))
                    .isInstanceOf(IllegalStateException.class);
        }
    }

    @Nested
    @DisplayName("poll 메서드 테스트")
    class PollTest {

        @Test
        @DisplayName("updateQueue가 비어있을 때 createQueue에서 teamPlaceId 반환")
        void testPollWhenUpdateQueueIsEmpty() throws InterruptedException {
            // given
            final Long teamPlaceId = 1L;
            deployWaitingQueue.addCreate(teamPlaceId);

            // when
            Optional<Long> result = deployWaitingQueue.poll(FAST_POLL_TIMEOUT, FAST_POLL_TIMEOUT_UNIT);

            // then
            assertThat(result).isPresent().contains(teamPlaceId);
        }

        @Test
        @DisplayName("createQueue가 비어있을 때 updateQueue에서 teamPlaceId 반환")
        void testPollWhenCreateQueueIsEmpty() throws InterruptedException {
            // given
            final Long teamPlaceId = 1L;
            deployWaitingQueue.addUpdate(teamPlaceId);

            // when
            Optional<Long> result = deployWaitingQueue.poll(FAST_POLL_TIMEOUT, FAST_POLL_TIMEOUT_UNIT);

            // then
            assertThat(result).isPresent().contains(teamPlaceId);
        }

        @Test
        @DisplayName("두 큐가 모두 비어있을 때 poll timeout 후 빈 Optional 반환")
        void testPollWhenBothQueuesAreEmpty() throws Exception {
            // given

            // when
            Optional<Long> result = deployWaitingQueue.poll(FAST_POLL_TIMEOUT, FAST_POLL_TIMEOUT_UNIT);

            // then
            assertThat(result).isNotPresent();
        }

        @Test
        @DisplayName("두 큐가 모두 비어있지 않을 때 가중치에 따라 teamPlaceId 반환")
        void testPollWhenBothQueuesAreNotEmpty() throws InterruptedException {
            // given
            final Long createTeamPlaceId1 = 1L;
            final Long createTeamPlaceId2 = 2L;
            final Long createTeamPlaceId3 = 3L;
            final Long createTeamPlaceId4 = 4L;
            final Long updateTeamPlaceId = 5L;
            deployWaitingQueue.addCreate(createTeamPlaceId1);
            deployWaitingQueue.addCreate(createTeamPlaceId2);
            deployWaitingQueue.addCreate(createTeamPlaceId3);
            deployWaitingQueue.addCreate(createTeamPlaceId4);
            deployWaitingQueue.addUpdate(updateTeamPlaceId);

            // when
            Optional<Long> firstResult = deployWaitingQueue.poll(FAST_POLL_TIMEOUT, FAST_POLL_TIMEOUT_UNIT);
            Optional<Long> secondResult = deployWaitingQueue.poll(FAST_POLL_TIMEOUT, FAST_POLL_TIMEOUT_UNIT);
            Optional<Long> thirdResult = deployWaitingQueue.poll(FAST_POLL_TIMEOUT, FAST_POLL_TIMEOUT_UNIT);
            Optional<Long> fourthResult = deployWaitingQueue.poll(FAST_POLL_TIMEOUT, FAST_POLL_TIMEOUT_UNIT);
            Optional<Long> fifthResult = deployWaitingQueue.poll(FAST_POLL_TIMEOUT, FAST_POLL_TIMEOUT_UNIT);

            // then
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(firstResult).isPresent().contains(createTeamPlaceId1);
                softly.assertThat(secondResult).isPresent().contains(createTeamPlaceId2);
                softly.assertThat(thirdResult).isPresent().contains(createTeamPlaceId3);
                softly.assertThat(fourthResult).isPresent().contains(updateTeamPlaceId);
                softly.assertThat(fifthResult).isPresent().contains(createTeamPlaceId4);
            });
        }
    }

    @Test
    @DisplayName("thread-safe 테스트")
    void testThreadSafety() throws NoSuchFieldException, IllegalAccessException, InterruptedException {
        // given
        final long originalTimeout = 5L;
        final TimeUnit originalTimeUnit = TimeUnit.SECONDS;

        final int OPERATION_COUNT = 100;
        ExecutorService executorService = Executors.newFixedThreadPool(3 * OPERATION_COUNT);

        LongStream.range(0, OPERATION_COUNT).forEach(i -> {
            // put create and update
            executorService.submit(() -> {
                deployWaitingQueue.addCreate(i);
            });
            executorService.submit(() -> {
                deployWaitingQueue.addUpdate(i);
            });

            // poll 2 times
            for (int j = 0; j < 2; j++) {
                executorService.submit(() -> {
                    try {
                        Optional<Long> poll = deployWaitingQueue.poll(originalTimeout, originalTimeUnit);
                        while (poll.isEmpty()) {
                            poll = deployWaitingQueue.poll(originalTimeout, originalTimeUnit);
                        }
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                });
            }
        });

        executorService.shutdown();
        executorService.awaitTermination(10, TimeUnit.SECONDS);

        // when
        Optional<Long> result = deployWaitingQueue.poll(FAST_POLL_TIMEOUT, FAST_POLL_TIMEOUT_UNIT);

        // then
        assertThat(result).isNotPresent();
    }

}
