package team.teamby.teambyteam.icalendar.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.core.task.SyncTaskExecutor;
import org.springframework.test.context.transaction.TestTransaction;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.schedule.application.event.ScheduleCreateEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleEvent;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.application.event.TeamPlaceCreatedEvent;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.concurrent.Executor;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

class IcalendarEventListenerTest extends ServiceTest {

    @Autowired
    private IcalendarEventListener icalendarEventListener;

    @MockBean
    private IcalendarPublishService icalendarPublishService;

    @TestConfiguration
    static class TestConfig {
        @Bean
        @Primary
        public Executor executor() {
            return new SyncTaskExecutor();
        }
    }

    @BeforeEach
    void setup() {
        Mockito.reset(icalendarPublishService);
    }

    @Test
    @DisplayName("Ical생성에 성공한다")
    void successCallCreatingIcalendar() {
        // given
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());

        TestTransaction.flagForCommit();
        TestTransaction.end();

        final TeamPlaceCreatedEvent teamPlaceCreatedEvent = new TeamPlaceCreatedEvent(ENGLISH_TEAM_PLACE.getId());

        // when
        icalendarEventListener.createIcalendar(teamPlaceCreatedEvent);

        // then
        verify(icalendarPublishService, times(1)).createAndPublishIcalendar(ENGLISH_TEAM_PLACE.getId());
    }

    @Test
    @DisplayName("이미 ical배포중인 팀플레이스에서 uploadFile이 잘 실행이 된다.")
    void successCallUpdateIcalendar() {
        // given
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
        final Schedule schedule = testFixtureBuilder.buildSchedule(ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

        TestTransaction.flagForCommit();
        TestTransaction.end();

        final ScheduleEvent scheduleEvent = new ScheduleCreateEvent(schedule.getId(), ENGLISH_TEAM_PLACE.getId(), schedule.getTitle(), schedule.getSpan());

        // when
        icalendarEventListener.updateIcalendar(scheduleEvent);

        // then
        verify(icalendarPublishService, times(1)).updateIcalendar(ENGLISH_TEAM_PLACE.getId());
    }
}
