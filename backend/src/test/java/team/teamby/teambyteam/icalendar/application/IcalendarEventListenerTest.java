package team.teamby.teambyteam.icalendar.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import team.teamby.teambyteam.common.ServiceTest;
import team.teamby.teambyteam.common.fixtures.ScheduleFixtures;
import team.teamby.teambyteam.icalendar.application.event.CreateIcalendarEvent;
import team.teamby.teambyteam.icalendar.configuration.TestSynchronousTaskExecutorConfig;
import team.teamby.teambyteam.icalendar.util.DeployWaitingQueue;
import team.teamby.teambyteam.schedule.application.event.ScheduleCreateEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleEvent;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.teamplace.application.event.TeamPlaceCreatedEvent;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static team.teamby.teambyteam.common.fixtures.TeamPlaceFixtures.ENGLISH_TEAM_PLACE;

@Import({TestSynchronousTaskExecutorConfig.class})
class IcalendarEventListenerTest extends ServiceTest {

    @Autowired
    private IcalendarEventListener icalendarEventListener;

    @MockBean
    private DeployWaitingQueue deployWaitingQueue;

//    @TestConfiguration
//    @Profile("test")
//    static class TestConfig {
//
//        @Bean("icalendarEventListenerAsyncExecutor")
//        @Primary
//        public Executor executor() {
//            return new SyncTaskExecutor();
//        }
//    }

    @BeforeEach
    void setUp() {
        Mockito.reset(deployWaitingQueue);
    }

    @Test
    @DisplayName("팀플레이스 생성 이벤트 발생시 Ical생성에 성공한다")
    void successCallCreatingIcalendarWhenTeamPlaceCreated() {
        // given
        final long teamPlaceId = 1L;
        final TeamPlaceCreatedEvent teamPlaceCreatedEvent = new TeamPlaceCreatedEvent(teamPlaceId);

        // when
        icalendarEventListener.createIcalendar(teamPlaceCreatedEvent);

        // then
        verify(deployWaitingQueue, times(1)).addCreate(teamPlaceId);
    }

    @Test
    @DisplayName("Ical생성에 성공한다.")
    void successCallCreatingIcalendar() {
        // given
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());

        final CreateIcalendarEvent createIcalendarEvent = new CreateIcalendarEvent(ENGLISH_TEAM_PLACE.getId());

        // when
        icalendarEventListener.createIcalendar(createIcalendarEvent);

        // then
        verify(deployWaitingQueue, times(1)).addCreate(ENGLISH_TEAM_PLACE.getId());
    }

    @Test
    @DisplayName("이미 ical배포중인 팀플레이스에서 uploadFile이 잘 실행이 된다.")
    void successCallUpdateIcalendar() {
        // given
        final TeamPlace ENGLISH_TEAM_PLACE = testFixtureBuilder.buildTeamPlace(ENGLISH_TEAM_PLACE());
        final Schedule schedule = testFixtureBuilder.buildSchedule(ScheduleFixtures.MONTH_7_AND_DAY_12_N_HOUR_SCHEDULE(ENGLISH_TEAM_PLACE.getId()));

        final ScheduleEvent scheduleEvent = new ScheduleCreateEvent(schedule.getId(), ENGLISH_TEAM_PLACE.getId());

        // when
        icalendarEventListener.updateIcalendar(scheduleEvent);

        // then
        verify(deployWaitingQueue, times(1)).addUpdate(ENGLISH_TEAM_PLACE.getId());
    }
}
