package team.teamby.teambyteam.feed.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import team.teamby.teambyteam.common.RepositoryTest;
import team.teamby.teambyteam.common.fixtures.ScheduleEventFixtures;
import team.teamby.teambyteam.feed.domain.notification.Notification;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.schedule.application.event.ScheduleCreateEvent;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class FeedRepositoryTest extends RepositoryTest {

    @Autowired
    private FeedRepository feedRepository;

    @Test
    @DisplayName("팀플레이스 id로 피드를 조회한다.")
    void findByTeamPlaceId() {
        //given
        FeedThread feedThread = new FeedThread(1L, new Content("테스트 스레드"), 1L);
        feedRepository.save(feedThread);

        //when
        List<Feed> feeds = feedRepository.findByTeamPlaceId(1L);

        ///then
        assertSoftly(softly -> {
            softly.assertThat(feeds).hasSize(1);
            softly.assertThat(feeds.get(0)).isInstanceOf(FeedThread.class);
            softly.assertThat(feeds.get(0).getContent()).isEqualTo(new Content("테스트 스레드"));
        });
    }

    @Test
    @DisplayName("팀플레이스 id로 피드를 조회할 때 처음 최신 것을 조회한다.")
    void findByTeamPlaceIdLatest() {
        //given
        List<Feed> insertFeeds = new ArrayList<>();
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        testFixtureBuilder.buildFeeds(insertFeeds);
        final int size = 3;

        //when
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(0, size, sort);
        List<Feed> feeds = feedRepository.findByTeamPlaceId(1L, pageable);

        ///then
        assertSoftly(softly -> {
            softly.assertThat(feeds).hasSize(size);
            softly.assertThat(feeds.get(0).getId()).isEqualTo(3);
            softly.assertThat(feeds.get(1).getId()).isEqualTo(2);
            softly.assertThat(feeds.get(2).getId()).isEqualTo(1);
        });
    }

    @Test
    @DisplayName("팀플레이스 id로 피드를 조회할 때 다음 최신 것을 조회한다.")
    void findByTeamPlaceIdNextLatest() {
        //given
        List<Feed> insertFeeds = new ArrayList<>();
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        testFixtureBuilder.buildFeeds(insertFeeds);
        final long lastId = 5L;
        final int size = 3;

        //when
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(0, size, sort);
        List<Feed> feeds = feedRepository.findByTeamPlaceIdAndIdLessThan(1L, lastId, pageable);

        ///then
        assertSoftly(softly -> {
            softly.assertThat(feeds).hasSize(size);
            softly.assertThat(feeds.get(0).getId()).isEqualTo(3);
            softly.assertThat(feeds.get(1).getId()).isEqualTo(2);
            softly.assertThat(feeds.get(2).getId()).isEqualTo(1);
        });
    }

    @Test
    @DisplayName("팀플레이스 id로 피드를 조회할 때 다른 팀플리에스의 것은 가져오지 않는다.")
    void findByTeamPlaceIdNotIncludeAnotherTeamPlace() {
        //given
        List<Feed> insertFeeds = new ArrayList<>();
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        insertFeeds.add(new FeedThread(2L, new Content("테스트 스레드"), 1L));
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        insertFeeds.add(new FeedThread(2L, new Content("테스트 스레드"), 1L));
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        insertFeeds.add(new FeedThread(2L, new Content("테스트 스레드"), 1L));
        testFixtureBuilder.buildFeeds(insertFeeds);
        final int size = 2;

        //when
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(0, size, sort);
        List<Feed> feeds = feedRepository.findByTeamPlaceId(1L, pageable);

        ///then
        assertSoftly(softly -> {
            softly.assertThat(feeds).hasSize(size);
            softly.assertThat(feeds.get(0).getId()).isEqualTo(5);
            softly.assertThat(feeds.get(1).getId()).isEqualTo(3);
        });
    }

    @Test
    @DisplayName("팀플레이스 id로 피드를 조회할 때 size보다 적으면 그만큼 가져온다.")
    void findByTeamPlaceIdUnderSize() {
        //given
        List<Feed> insertFeeds = new ArrayList<>();
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        insertFeeds.add(new FeedThread(1L, new Content("테스트 스레드"), 1L));
        testFixtureBuilder.buildFeeds(insertFeeds);
        final int size = 10;

        //when
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(0, size, sort);
        List<Feed> feeds = feedRepository.findByTeamPlaceId(1L, pageable);

        ///then
        assertSoftly(softly -> {
            softly.assertThat(feeds).hasSize(insertFeeds.size());
            softly.assertThat(feeds.get(0).getId()).isEqualTo(3);
            softly.assertThat(feeds.get(1).getId()).isEqualTo(2);
            softly.assertThat(feeds.get(2).getId()).isEqualTo(1);
        });
    }
}
