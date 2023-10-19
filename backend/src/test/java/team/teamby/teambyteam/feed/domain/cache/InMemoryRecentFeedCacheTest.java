package team.teamby.teambyteam.feed.domain.cache;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import team.teamby.teambyteam.common.fixtures.FeedThreadFixtures;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class InMemoryRecentFeedCacheTest {

    private RecentFeedCache recentFeedCache;

    @BeforeEach
    void setup() {
        recentFeedCache = new InMemoryRecentFeedCache();
    }

    @Nested
    @DisplayName("캐시 여부 확인 테스트")
    class IsCachedTest {

        @Test
        @DisplayName("케시가 저장되지 않은 팀플레이스 아이디는 isCached가 flase를 반환한다.")
        void falseWithUnCachedTeamPlace() {
            // given
            final long teamPlaceId = 1L;
            final long authorId = 2L;
            recentFeedCache.addCache(teamPlaceId, RecentFeedCache.FeedCache.from(FeedThreadFixtures.CONTENT_AND_IMAGE(teamPlaceId, authorId)));

            // when
            final boolean cached = recentFeedCache.isCached(2L, 0);

            // then
            assertThat(cached).isFalse();
        }

        @Test
        @DisplayName("저장된 케시 수보다 많은 수로 요청하면 false를 반환한다.")
        void falseWithLessCachedTeamPlace() {
            // given
            final long teamPlaceId = 1L;
            final long authorId = 2L;
            recentFeedCache.addCache(teamPlaceId, RecentFeedCache.FeedCache.from(FeedThreadFixtures.CONTENT_AND_IMAGE(teamPlaceId, authorId)));

            // when
            final boolean cached = recentFeedCache.isCached(teamPlaceId, 2);

            // then
            assertThat(cached).isFalse();
        }

        @Test
        @DisplayName("저장된 케시가 있으면 true를 반환한다")
        void trueWithCachedData() {
            final long teamPlaceId = 1L;
            final long authorId = 2L;
            recentFeedCache.addCache(teamPlaceId, RecentFeedCache.FeedCache.from(FeedThreadFixtures.CONTENT_AND_IMAGE(teamPlaceId, authorId)));

            // when
            final boolean cached = recentFeedCache.isCached(teamPlaceId, 1);

            // then
            assertThat(cached).isTrue();
        }
    }

    @Test
    @DisplayName("캐시 추가 및 가져오기 테스트")
    void test() {
        // given
        final long teamPlaceId = 1L;
        final long authorId = 2L;
        final RecentFeedCache.FeedCache cache1 = RecentFeedCache.FeedCache.from(FeedThreadFixtures.CONTENT_AND_IMAGE(teamPlaceId, authorId));
        final RecentFeedCache.FeedCache cache2 = RecentFeedCache.FeedCache.from(FeedThreadFixtures.CONTENT_ONLY_AND_IMAGE_EMPTY(teamPlaceId, authorId));

        // when
        recentFeedCache.addCache(teamPlaceId, cache1);
        recentFeedCache.addCache(teamPlaceId, cache2);
        final List<RecentFeedCache.FeedCache> cachedData = recentFeedCache.getCache(teamPlaceId, 2);

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(cachedData.get(0)).usingRecursiveComparison()
                    .isEqualTo(cache2);
            softly.assertThat(cachedData.get(1)).usingRecursiveComparison()
                    .isEqualTo(cache1);
        });
    }

    @Test
    @DisplayName("캐시의 수는 20개로 고정이된다")
    void maximumCacheCountIs20() {
        // given
        final long teamPlaceId = 1L;
        final long authorId = 2L;
        final RecentFeedCache.FeedCache cache1 = RecentFeedCache.FeedCache.from(FeedThreadFixtures.CONTENT_AND_IMAGE(teamPlaceId, authorId));
        final RecentFeedCache.FeedCache cache2 = RecentFeedCache.FeedCache.from(FeedThreadFixtures.CONTENT_ONLY_AND_IMAGE_EMPTY(teamPlaceId, authorId));

        // when
        for (int i = 0; i < 20; i++) {
            recentFeedCache.addCache(teamPlaceId, cache1);
        }
        recentFeedCache.addCache(teamPlaceId, cache2);

        final boolean cached = recentFeedCache.isCached(teamPlaceId, 21);
        final List<RecentFeedCache.FeedCache> cachedData = recentFeedCache.getCache(teamPlaceId, 20);

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(cachedData.get(0)).usingRecursiveComparison()
                    .isEqualTo(cache2);
            softly.assertThat(cachedData).hasSize(20);
            softly.assertThat(cached).isFalse();
        });
    }
}
