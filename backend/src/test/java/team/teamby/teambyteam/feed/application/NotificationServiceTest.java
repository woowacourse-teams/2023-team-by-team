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
import team.teamby.teambyteam.feed.domain.notification.schedulenotification.ScheduleNotification;
import team.teamby.teambyteam.feed.domain.notification.sharedlinknotification.SharedLinkNotification;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.schedule.application.event.ScheduleCreateEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleDeleteEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleUpdateEvent;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.sharedlink.application.event.SharedLinkCreateEvent;
import team.teamby.teambyteam.sharedlink.application.event.SharedLinkDeleteEvent;
import team.teamby.teambyteam.sharedlink.domain.SharedLink;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static team.teamby.teambyteam.common.fixtures.ScheduleEventFixtures.SCHEDULE_CREATE_EVENT;
import static team.teamby.teambyteam.common.fixtures.ScheduleEventFixtures.SCHEDULE_DELETE_EVENT;
import static team.teamby.teambyteam.common.fixtures.ScheduleEventFixtures.SCHEDULE_UPDATE_EVENT;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE;
import static team.teamby.teambyteam.common.fixtures.ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_UPDATE_REQUEST;
import static team.teamby.teambyteam.common.fixtures.SharedLinkEventFixtures.SHARED_LINK_CREATE_EVENT;
import static team.teamby.teambyteam.common.fixtures.SharedLinkEventFixtures.SHARED_LINK_DELETE_EVENT;
import static team.teamby.teambyteam.common.fixtures.SharedLinkFixtures.TEAM_BY_TEAM_LINK;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

@Disabled
class NotificationServiceTest extends ServiceTest {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private FeedRepository feedRepository;

    @Nested
    @DisplayName("일정 등록 시 일정 등록 알림 생성")
    class CreateScheduleNotificationWhenCreateSchedule {

        @Test
        @DisplayName("정상적으로 성공한다.")
        void success() {
            // given
            TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            ScheduleCreateEvent scheduleCreateEvent =
                    SCHEDULE_CREATE_EVENT(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE);
            ScheduleNotification expected = ScheduleNotification.from(scheduleCreateEvent);

            // when
            notificationService.createScheduleNotification(scheduleCreateEvent);
            List<Feed> feeds = feedRepository.findByTeamPlaceId(ENGLISH_TEAM_PLACE.getId());

            // then
            assertThat(feeds.get(0)).usingRecursiveComparison()
                    .ignoringFields("id", "createdAt", "updatedAt").isEqualTo(expected);
        }
    }

    @Nested
    @DisplayName("일정 수정 시 일정 수정 알림 생성")
    class CreateScheduleNotificationWhenUpdateSchedule {

        @Test
        @DisplayName("정상적으로 성공한다.")
        void success() throws InterruptedException {
            // given
            TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            ScheduleUpdateEvent scheduleCreateEvent =
                    SCHEDULE_UPDATE_EVENT(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE, MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE_UPDATE_REQUEST);
            ScheduleNotification expected = ScheduleNotification.from(scheduleCreateEvent);

            // when
            notificationService.createScheduleNotification(scheduleCreateEvent);
            List<Feed> feeds = feedRepository.findByTeamPlaceId(ENGLISH_TEAM_PLACE.getId());

            // then
            assertThat(feeds.get(0)).usingRecursiveComparison()
                    .ignoringFields("id", "createdAt", "updatedAt").isEqualTo(expected);
        }
    }

    @Nested
    @DisplayName("일정 삭제 시 일정 삭제 알림 생성")
    class CreateScheduleNotificationWhenDeleteSchedule {

        @Test
        @DisplayName("정상적으로 성공한다.")
        void success() {
            // given
            TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            Schedule MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE = testFixtureBuilder.buildSchedule(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));
            ScheduleDeleteEvent scheduleDeleteEvent =
                    SCHEDULE_DELETE_EVENT(MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE);
            ScheduleNotification expected = ScheduleNotification.from(scheduleDeleteEvent);

            // when
            notificationService.createScheduleNotification(scheduleDeleteEvent);
            List<Feed> feeds = feedRepository.findByTeamPlaceId(ENGLISH_TEAM_PLACE.getId());

            // then
            assertThat(feeds.get(0)).usingRecursiveComparison()
                    .ignoringFields("id", "createdAt", "updatedAt").isEqualTo(expected);
        }
    }

    @Nested
    @DisplayName("공유 링크 등록 시 등록 알림 생성")
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
