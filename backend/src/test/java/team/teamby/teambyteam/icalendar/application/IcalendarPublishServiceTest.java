package team.teamby.teambyteam.icalendar.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static team.teamby.teambyteam.common.fixtures.PublishedIcalendarFixtures.TEST_ICALENDAR;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

import java.util.Optional;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendarRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

class IcalendarPublishServiceTest extends ServiceTest {

    @Autowired
    private IcalendarPublishService icalendarPublishService;

    @Autowired
    private PublishedIcalendarRepository publishedIcalendarRepository;

    @MockBean
    private FileCloudUploader fileCloudUploader;

    @Nested
    @DisplayName("Ical 생성 테스트")
    class createAndPublishTest {

        @Test
        @DisplayName("Ical생성에 성공한다")
        void successCreatingIcalendar() {
            // given
            BDDMockito.given(fileCloudUploader.upload(any(byte[].class), any(String.class), any(String.class)))
                    .willAnswer(invocation -> {
                        Thread.sleep(500L);
                        return "https://test.com/test.ics";
                    });

            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());

            // when
            icalendarPublishService.createAndPublishIcalendar(ENGLISH_TEAM_PLACE.getId());

            // then
            final Optional<PublishedIcalendar> publishedIcalendar = publishedIcalendarRepository.findByTeamPlaceId(ENGLISH_TEAM_PLACE.getId());
            final String expectedFileNamePatter = "^" + ENGLISH_TEAM_PLACE.getId() + ".+[.]ics$";
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(publishedIcalendar).isPresent();
                softly.assertThat(publishedIcalendar.get().getPublishUrlValue()).isEqualTo("https://test.com/test.ics");
                softly.assertThat(publishedIcalendar.get().getIcalendarFileNameValue()).matches(expectedFileNamePatter);
            });
        }

        @Test
        @DisplayName("이미 생성이되어있으면 새롭게 생성하지 않는다.")
        void doesNotGenerateNewFileIfAlreadyExist() {
            // given
            BDDMockito.given(fileCloudUploader.upload(any(byte[].class), any(String.class), any(String.class)))
                    .willAnswer(invocation -> {
                        Thread.sleep(500L);
                        return "https://test.com/changed-test.ics";
                    });

            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final PublishedIcalendar TEST_ICAL = testFixtureBuilder.buildPublishedIcalendar(TEST_ICALENDAR(ENGLISH_TEAM_PLACE.getId()));

            // when
            icalendarPublishService.createAndPublishIcalendar(ENGLISH_TEAM_PLACE.getId());

            // then
            final Optional<PublishedIcalendar> actual = publishedIcalendarRepository.findByTeamPlaceId(ENGLISH_TEAM_PLACE.getId());
            SoftAssertions.assertSoftly(softly -> {
                softly.assertThat(actual).isPresent();
                softly.assertThat(actual.get().getIcalendarFileName()).isEqualTo(TEST_ICAL.getIcalendarFileName());
            });
        }
    }

    @Nested
    @DisplayName("icalendar 업데이트 테스트")
    class UpdateIcalendarTest {

        @Test
        @DisplayName("이미 ical배포중인 팀플레이스에서 uploadFile이 잘 실행이 된다.")
        void successWithAlreadyPublishedIcs() {
            // given
            BDDMockito.given(fileCloudUploader.upload(any(byte[].class), any(String.class), any(String.class)))
                    .willAnswer(invocation -> {
                        Thread.sleep(500L);
                        return "https://test.com/test.ics";
                    });

            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final PublishedIcalendar publishedIcalendar = testFixtureBuilder.buildPublishedIcalendar(TEST_ICALENDAR(ENGLISH_TEAM_PLACE.getId()));
            testFixtureBuilder.buildSchedule(ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            // when
            icalendarPublishService.updateIcalendar(ENGLISH_TEAM_PLACE.getId());

            // then
            ArgumentCaptor<String> fileNameCaptor = ArgumentCaptor.forClass(String.class);
            ArgumentCaptor<byte[]> icalBytesCaptor = ArgumentCaptor.forClass(byte[].class);
            verify(fileCloudUploader).upload(icalBytesCaptor.capture(), fileNameCaptor.capture(), fileNameCaptor.capture());

            final String actualUploadedFileName = fileNameCaptor.getValue();
            assertThat(actualUploadedFileName).endsWith(publishedIcalendar.getIcalendarFileNameValue());
        }

        @Test
        @DisplayName("ical이 배포중이지 않은 팀플레이스에서 일정변동시 생성과 초기화를 진행한다.")
        void successWithNewIcs() {
            // given
            BDDMockito.given(fileCloudUploader.upload(any(byte[].class), any(String.class), any(String.class)))
                    .willAnswer(invocation -> {
                        Thread.sleep(500L);
                        return "https://test.com/test.ics";
                    });

            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            testFixtureBuilder.buildSchedule(ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            // when
            icalendarPublishService.updateIcalendar(ENGLISH_TEAM_PLACE.getId());

            // then
            ArgumentCaptor<String> fileNameCaptor = ArgumentCaptor.forClass(String.class);
            ArgumentCaptor<byte[]> icalBytesCaptor = ArgumentCaptor.forClass(byte[].class);
            verify(fileCloudUploader).upload(icalBytesCaptor.capture(), fileNameCaptor.capture(), fileNameCaptor.capture());

            final String actualUploadedFileName = fileNameCaptor.getAllValues().get(0);
            final String expectedFileNamePatter = "^.+[/]" + ENGLISH_TEAM_PLACE.getId() + ".+[.]ics$";
            assertThat(actualUploadedFileName).matches(expectedFileNamePatter);
        }
    }
}
