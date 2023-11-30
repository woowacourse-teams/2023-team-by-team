package team.teamby.teambyteam.icalendar.domain;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class IcalendarPublishCounterTest {

    private IcalendarPublishCounter icalendarPublishCounter;

    @BeforeEach
    void setup() {
        icalendarPublishCounter = new IcalendarPublishCounter();
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 1, 5, 9})
    @DisplayName("10회 미만 배포한 경우 MAX에 도달했는지 확인시 false 반환 테스트")
    void unreachedMaxTest(final int publishCount) {
        // given
        final long teamPlaceId = 1L;
        for (int i = 0; i < publishCount; i++) {
            icalendarPublishCounter.addCountFor(teamPlaceId);
        }

        // when
        final boolean actual = icalendarPublishCounter.isReachedToMaxCount(teamPlaceId);

        // then
        assertThat(actual).isFalse();
    }

    @ParameterizedTest
    @ValueSource(ints = {10, 11})
    @DisplayName("10회 이상 배포한 경우 MAX에 도달했는지 확인시 true 반환 테스트")
    void reachMaxTest(final int publishCount) {
        // given
        final long teamPlaceId = 1L;
        for (int i = 0; i < publishCount; i++) {
            icalendarPublishCounter.addCountFor(teamPlaceId);
        }

        // when
        final boolean actual = icalendarPublishCounter.isReachedToMaxCount(teamPlaceId);

        // then
        assertThat(actual).isTrue();
    }

    @Test
    @DisplayName("10회 이상 배포요청이 들어온 팀 아이디리스트 반환 테스트")
    void getPublishDelayedTeamPlaceIdsTest() {
        // given
        final Long teamPlace1Id = 1L;
        final Long teamPlace2Id = 2L;
        final Long teamPlace3Id = 3L;

        icalendarPublishCounter.addCountFor(teamPlace3Id);
        for (int i = 0; i < 10; i++) {
            icalendarPublishCounter.addCountFor(teamPlace1Id);
            icalendarPublishCounter.addCountFor(teamPlace2Id);
        }
        icalendarPublishCounter.addCountFor(teamPlace2Id);

        // when
        final List<Long> publishDelayedTeamPlaceIds = icalendarPublishCounter.getPublishDelayedTeamPlaceIds();

        // then
        assertThat(publishDelayedTeamPlaceIds).containsExactlyInAnyOrder(teamPlace1Id, teamPlace2Id);
    }

    @Test
    @DisplayName("지정된 팀의 배포 카운트 초기화 테스트")
    void clearSpecificTeamPlaceCounterTest() {
        // given
        final Long teamPlaceId = 1L;
        for (int i = 0; i < 10; i++) {
            icalendarPublishCounter.addCountFor(teamPlaceId);
        }

        // when
        final boolean beforeClear = icalendarPublishCounter.isReachedToMaxCount(teamPlaceId);
        icalendarPublishCounter.clearFor(teamPlaceId);
        final boolean afterClear = icalendarPublishCounter.isReachedToMaxCount(teamPlaceId);

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(beforeClear).isTrue();
            softly.assertThat(afterClear).isFalse();
        });
    }

    @Test
    @DisplayName("딜레이 되지 않은 배포 카운트 초기화 테스트")
    void clearNotDelayedCountTest() {
        // given
        final Long teamPlace1Id = 1L;
        final Long teamPlace2Id = 2L;
        final Long teamPlace3Id = 3L;

        for (int i = 0; i < 11; i++) {
            icalendarPublishCounter.addCountFor(teamPlace1Id);
            icalendarPublishCounter.addCountFor(teamPlace2Id);
        }
        icalendarPublishCounter.addCountFor(teamPlace2Id);
        for (int i = 0; i < 5; i++) {
            icalendarPublishCounter.addCountFor(teamPlace3Id);
        }

        // when
        icalendarPublishCounter.clearNotDelayedCounts();
        final List<Long> firstResult = icalendarPublishCounter.getPublishDelayedTeamPlaceIds();
        for (int i = 0; i < 6; i++) {
            icalendarPublishCounter.addCountFor(teamPlace3Id);
        }
        final List<Long> secondResult = icalendarPublishCounter.getPublishDelayedTeamPlaceIds();

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(firstResult).containsExactlyInAnyOrder(teamPlace1Id, teamPlace2Id);
            softly.assertThat(secondResult).containsExactlyInAnyOrder(teamPlace1Id, teamPlace2Id);
        });
    }

    @Test
    @DisplayName("배포 카운트 초기화 test")
    void clearTest() {
        // given
        final Long teamPlace1Id = 1L;
        for (int i = 0; i < 10; i++) {
            icalendarPublishCounter.addCountFor(teamPlace1Id);
        }

        // when
        final boolean beforeClear = icalendarPublishCounter.isReachedToMaxCount(teamPlace1Id);
        icalendarPublishCounter.clearAll();
        final boolean afterClear = icalendarPublishCounter.isReachedToMaxCount(teamPlace1Id);

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(beforeClear).isTrue();
            softly.assertThat(afterClear).isFalse();
        });
    }
}
