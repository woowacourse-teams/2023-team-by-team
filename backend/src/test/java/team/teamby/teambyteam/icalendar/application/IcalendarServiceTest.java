package team.teamby.teambyteam.icalendar.application;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.PublishedIcalendarFixtures;
import team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures;
import team.teamby.teambyteam.icalendar.application.dto.IcalendarUrlResponse;
import team.teamby.teambyteam.icalendar.application.event.CreateIcalendarEvent;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class IcalendarServiceTest extends ServiceTest {

    @Autowired
    private IcalendarService icalendarService;

    @Test
    @DisplayName("Icalendar url조회에 성공한다.")
    void successGetIcalendarUrl() {
        // given
        final TeamPlace CONTROL_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.CONTROLS_TEAM_PLACE());
        final PublishedIcalendar publishedIcalendar = testFixtureBuilder.buildPublishedIcalendar(PublishedIcalendarFixtures.TEST_ICALENDAR(CONTROL_TEAM_PLACE.getId()));

        // when
        final Optional<IcalendarUrlResponse> publishedIcalUrl = icalendarService.getPublishedIcalUrl(CONTROL_TEAM_PLACE.getId());

        // then
        assertThat(publishedIcalUrl.get().url()).isEqualTo(publishedIcalendar.getPublishUrlValue());
    }

    @Test
    @DisplayName("url이 아직 생성되지 않은 경우 빈 Optional을 반환하고, 이벤트를 publish한다.")
    void failWhenNotFound() {
        // given
        final TeamPlace CONTROL_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(TeamPlaceFixtures.CONTROLS_TEAM_PLACE());

        // when
        final Optional<IcalendarUrlResponse> publishedIcalUrl = icalendarService.getPublishedIcalUrl(CONTROL_TEAM_PLACE.getId());

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(publishedIcalUrl).isEmpty();
            softly.assertThat(applicationEvents.stream(CreateIcalendarEvent.class).count()).isEqualTo(1);
        });
    }
}
