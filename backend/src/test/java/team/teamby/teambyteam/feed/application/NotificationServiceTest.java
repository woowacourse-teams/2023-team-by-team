package team.teamby.teambyteam.feed.application;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.MemberFixtures;
import team.teamby.teambyteam.feed.domain.Feed;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.feed.domain.notification.sharedlinknotification.SharedLinkNotification;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.sharedlink.application.event.SharedLinkCreateEvent;
import team.teamby.teambyteam.sharedlink.application.event.SharedLinkDeleteEvent;
import team.teamby.teambyteam.sharedlink.domain.SharedLink;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static team.teamby.teambyteam.common.fixtures.SharedLinkEventFixtures.SHARED_LINK_CREATE_EVENT;
import static team.teamby.teambyteam.common.fixtures.SharedLinkEventFixtures.SHARED_LINK_DELETE_EVENT;
import static team.teamby.teambyteam.common.fixtures.SharedLinkFixtures.TEAM_BY_TEAM_LINK;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

class NotificationServiceTest extends ServiceTest {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private FeedRepository feedRepository;

    @Nested
    @DisplayName("공유 링크 등록 시 등록 알림 생성")
    @Disabled(value = "공유링크 피드 알림기능 제거로 인한 테스트 disable - 추후 다른형식으로 부활 가능성 있음")
    class CreateSharedLinkNotificationWhenCreateSharedLink {

        @Test
        @DisplayName("정상적으로 성공한다.")
        void success() {
            // given
            final Member member = testFixtureBuilder.buildMember(MemberFixtures.SEONGHA());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final SharedLink sharedLink = testFixtureBuilder.buildSharedLink(TEAM_BY_TEAM_LINK(ENGLISH_TEAM_PLACE.getId(), member.getId()));
            final SharedLinkCreateEvent sharedLinkCreateEvent = SHARED_LINK_CREATE_EVENT(sharedLink);
            final SharedLinkNotification expected = SharedLinkNotification.from(sharedLinkCreateEvent);

            // when
            notificationService.createSharedLinkNotification(sharedLinkCreateEvent);
            final List<Feed> feeds = feedRepository.findByTeamPlaceId(ENGLISH_TEAM_PLACE.getId());

            // then
            assertThat(feeds.get(0)).usingRecursiveComparison()
                    .ignoringFields("id", "createdAt", "updatedAt").isEqualTo(expected);
        }
    }

    @Nested
    @DisplayName("공유 링크 삭제 시 삭제 알림 생성")
    @Disabled(value = "공유링크 피드 알림기능 제거로 인한 테스트 disable - 추후 다른형식으로 부활 가능성 있음")
    class CreateSharedLinkNotificationWhenDeleteSharedLink {

        @Test
        @DisplayName("정상적으로 성공한다.")
        void success() {
            // given
            final Member member = testFixtureBuilder.buildMember(MemberFixtures.SEONGHA());
            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final SharedLink sharedLink = testFixtureBuilder.buildSharedLink(TEAM_BY_TEAM_LINK(ENGLISH_TEAM_PLACE.getId(), member.getId()));
            final SharedLinkDeleteEvent sharedLinkDeleteEvent = SHARED_LINK_DELETE_EVENT(sharedLink);
            final SharedLinkNotification expected = SharedLinkNotification.from(sharedLinkDeleteEvent);

            // when
            notificationService.createSharedLinkNotification(sharedLinkDeleteEvent);
            final List<Feed> feeds = feedRepository.findByTeamPlaceId(ENGLISH_TEAM_PLACE.getId());

            // then
            assertThat(feeds.get(0)).usingRecursiveComparison()
                    .ignoringFields("id", "createdAt", "updatedAt").isEqualTo(expected);
        }
    }
}
