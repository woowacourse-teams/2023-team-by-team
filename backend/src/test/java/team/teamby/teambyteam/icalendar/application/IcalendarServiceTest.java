package team.teamby.teambyteam.icalendar.application;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.core.task.SyncTaskExecutor;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.PublishedIcalendarFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.icalendar.application.dto.IcalendarUrlResponse;
import team.teamby.teambyteam.icalendar.application.event.CreateIcalendarEvent;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;
import team.teamby.teambyteam.icalendar.exception.IcalendarNotFoundException;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.concurrent.Executor;

import static org.assertj.core.api.Assertions.assertThat;

class IcalendarServiceTest extends ServiceTest {

    @Autowired
    private IcalendarService icalendarService;

    @TestConfiguration
    static class TestConfig {
        @Bean
        @Primary
        public Executor executor() {
            return new SyncTaskExecutor();
        }
    }

    @Test
    @DisplayName("Icalendar url조회에 성공한다.")
    void successGetIcalendarUrl() {
        // given
        final TeamPlace CONTROL_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.CONTROLS_TEAM_PLACE());
        final PublishedIcalendar publishedIcalendar = testFixtureBuilder.buildPublishedIcalendar(PublishedIcalendarFixtures.TEST_ICALENDAR(CONTROL_TEAM_PLACE.getId()));

        // when
        final IcalendarUrlResponse publishedIcalUrl = icalendarService.getPublishedIcalUrl(CONTROL_TEAM_PLACE.getId());

        // then
        assertThat(publishedIcalUrl.url()).isEqualTo(publishedIcalendar.getPublishUrlValue());
    }

    @Test
    @DisplayName("url이 아직 생성되지 않은 경우 예외를 던지고, 이벤트를 publish한다.")
    void failWhenNotFound() {
        // given
        final TeamPlace CONTROL_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.CONTROLS_TEAM_PLACE());

        // when
        // then
        Assertions.assertThatThrownBy(() -> icalendarService.getPublishedIcalUrl(CONTROL_TEAM_PLACE.getId()))
                .isInstanceOf(IcalendarNotFoundException.class)
                .hasMessageContaining("배포중인 캘린더를 찾을 수 없습니다. 팀플레이스 아이디 : ");
        assertThat(applicationEvents.stream(CreateIcalendarEvent.class).count()).isEqualTo(1);
    }
}
