package team.teamby.teambyteam.icalendar.application;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.transaction.TestTransaction;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendarRepository;
import team.teamby.teambyteam.teamplace.application.event.TeamPlaceCreatedEvent;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static team.teamby.teambyteam.common.fixtures.PublishedIcalendarFixtures.TEST_ICALENDAR;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

class IcalendarEventListenerTest extends ServiceTest {

    @Autowired
    private IcalendarEventListener icalendarEventListener;

    @Autowired
    private PublishedIcalendarRepository publishedIcalendarRepository;

    @MockBean
    private FileCloudUploader fileCloudUploader;

    @Test
    @DisplayName("Ical생성에 성공한다")
    void successCreatingIcalendar() {
        // given
        BDDMockito.given(fileCloudUploader.upload(any(byte[].class), any(String.class)))
                .willAnswer(invocation -> {
                    Thread.sleep(1000L);
                    return "https://test.com/test.ice";
                });

        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());

        final TeamPlaceCreatedEvent teamPlaceCreatedEvent = new TeamPlaceCreatedEvent(ENGLISH_TEAM_PLACE.getId());

        TestTransaction.flagForCommit();
        TestTransaction.end();

        // when
        icalendarEventListener.createIcalendar(teamPlaceCreatedEvent);

        // then
        final Optional<PublishedIcalendar> publishedIcalendar = publishedIcalendarRepository.findByTeamPlaceId(ENGLISH_TEAM_PLACE.getId());
        final String expectedFileNamePatter = "^" + ENGLISH_TEAM_PLACE.getId() + ".+[.]ics$";
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(publishedIcalendar).isPresent();
            softly.assertThat(publishedIcalendar.get().getPublishUrlValue()).isEqualTo("https://test.com/test.ice");
            softly.assertThat(publishedIcalendar.get().getIcalendarFileNameValue()).matches(expectedFileNamePatter);
        });
    }

    @Test
    @DisplayName("이미 생성이되어있으면 새롭게 생성하지 않는다.")
    void doesNotGenerateNewFileIfAlreadyExist() {
        // given
        BDDMockito.given(fileCloudUploader.upload(any(byte[].class), any(String.class)))
                .willAnswer(invocation -> {
                    Thread.sleep(1000L);
                    return "https://test.com/changed-test.ice";
                });

        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
        final PublishedIcalendar TEST_ICAL = testFixtureBuilder.buildPublishedIcalendar(TEST_ICALENDAR(ENGLISH_TEAM_PLACE.getId()));

        final TeamPlaceCreatedEvent teamPlaceCreatedEvent = new TeamPlaceCreatedEvent(ENGLISH_TEAM_PLACE.getId());
        TestTransaction.flagForCommit();
        TestTransaction.end();

        // when
        icalendarEventListener.createIcalendar(teamPlaceCreatedEvent);

        // then
        final Optional<PublishedIcalendar> actual = publishedIcalendarRepository.findByTeamPlaceId(ENGLISH_TEAM_PLACE.getId());
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(actual).isPresent();
            softly.assertThat(actual.get().getIcalendarFileName()).isEqualTo(TEST_ICAL.getIcalendarFileName());
        });
    }
}
