package team.teamby.teambyteam.icalendar.application;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.transaction.TestTransaction;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendarRepository;
import team.teamby.teambyteam.schedule.application.event.ScheduleCreateEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleEvent;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.application.event.TeamPlaceCreatedEvent;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
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

    @Nested
    @DisplayName("icalendar 업데이트 테스트")
    class UpdateIcalendarTest {

        @Test
        @DisplayName("이미 ical배포중인 팀플레이스에서 uploadFile이 잘 실행이 된다.")
        void successWithAlreadyPublishedIcs() {
            // given
            BDDMockito.given(fileCloudUploader.upload(any(byte[].class), any(String.class)))
                    .willAnswer(invocation -> {
                        Thread.sleep(1000L);
                        return "https://test.com/test.ice";
                    });

            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final PublishedIcalendar publishedIcalendar = testFixtureBuilder.buildPublishedIcalendar(TEST_ICALENDAR(ENGLISH_TEAM_PLACE.getId()));
            final Schedule schedule = testFixtureBuilder.buildSchedule(ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            TestTransaction.flagForCommit();
            TestTransaction.end();

            final ScheduleEvent scheduleEvent = new ScheduleCreateEvent(schedule.getId(), ENGLISH_TEAM_PLACE.getId(), schedule.getTitle(), schedule.getSpan());

            // when
            icalendarEventListener.updateIcalendar(scheduleEvent);

            // then
            ArgumentCaptor<String> fileNameCaptor = ArgumentCaptor.forClass(String.class);
            ArgumentCaptor<byte[]> icalBytesCaptor = ArgumentCaptor.forClass(byte[].class);
            verify(fileCloudUploader).upload(icalBytesCaptor.capture(), fileNameCaptor.capture());

            final String actualUploadedFileName = fileNameCaptor.getValue();
            assertThat(actualUploadedFileName).endsWith(publishedIcalendar.getIcalendarFileNameValue());
        }

        @Test
        @DisplayName("ical이 배포중이지 않은 팀플레이스에서 일정변동시 생성과 초기화를 진행한다.")
        void successWithNewIcs() {
            // given
            BDDMockito.given(fileCloudUploader.upload(any(byte[].class), any(String.class)))
                    .willAnswer(invocation -> {
                        Thread.sleep(1000L);
                        return "https://test.com/test.ice";
                    });

            final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
            final Schedule schedule = testFixtureBuilder.buildSchedule(ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

            TestTransaction.flagForCommit();
            TestTransaction.end();

            final ScheduleEvent scheduleEvent = new ScheduleCreateEvent(schedule.getId(), ENGLISH_TEAM_PLACE.getId(), schedule.getTitle(), schedule.getSpan());

            // when
            icalendarEventListener.updateIcalendar(scheduleEvent);

            // then
            ArgumentCaptor<String> fileNameCaptor = ArgumentCaptor.forClass(String.class);
            ArgumentCaptor<byte[]> icalBytesCaptor = ArgumentCaptor.forClass(byte[].class);
            verify(fileCloudUploader).upload(icalBytesCaptor.capture(), fileNameCaptor.capture());

            final String actualUploadedFileName = fileNameCaptor.getValue();
            final String expectedFileNamePatter = "^.+[/]" + ENGLISH_TEAM_PLACE.getId() + ".+[.]ics$";
            assertThat(actualUploadedFileName).matches(expectedFileNamePatter);
        }
    }
}
