package team.teamby.teambyteam.feed.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import team.teamby.teambyteam.feed.domain.vo.Content;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class FeedRepositoryTest {

    @Autowired
    private FeedRepository feedRepository;

    @Test
    @DisplayName("팀플레이스 id로 피드를 조회한다.")
    void findByTeamPlaceId() {
        //given
        FeedThread feedThread = new FeedThread(1L, new Content("테스트 스레드"), 1L);
        Notification notification = new ScheduleNotification(1L, new Content("테스트 알림"), 1L);
        feedRepository.save(feedThread);
        feedRepository.save(notification);

        //when
        List<Feed> feeds = feedRepository.findByTeamPlaceId(1L);

        ///then
        assertSoftly(softly -> {
            softly.assertThat(feeds).hasSize(2);
            softly.assertThat(feeds.get(0)).isInstanceOf(FeedThread.class);
            softly.assertThat(feeds.get(0).getContent()).isEqualTo(new Content("테스트 스레드"));
            softly.assertThat(feeds.get(1)).isInstanceOf(ScheduleNotification.class);
            softly.assertThat(feeds.get(1).getContent()).isEqualTo(new Content("테스트 알림"));
        });
    }
}