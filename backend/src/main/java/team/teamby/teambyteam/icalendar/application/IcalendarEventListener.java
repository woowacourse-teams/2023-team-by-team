package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import team.teamby.teambyteam.icalendar.application.event.CreateIcalendarEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleEvent;
import team.teamby.teambyteam.teamplace.application.event.TeamPlaceCreatedEvent;

@Slf4j
@Component
@RequiredArgsConstructor
public class IcalendarEventListener {

    private final IcalendarPublishService icalendarPublishService;

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void createIcalendar(final TeamPlaceCreatedEvent teamPlaceCreatedEvent) {
        final Long teamPlaceId = teamPlaceCreatedEvent.teamPlaceId();

        icalendarPublishService.createAndPublishIcalendar(teamPlaceId);
        log.info("ics파일 생성 - teamPlaceId : {}", teamPlaceId);
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void createIcalendar(final CreateIcalendarEvent createIcalendarEvent) {
        final Long teamPlaceId = createIcalendarEvent.teamPlaceId();

        icalendarPublishService.createAndPublishIcalendar(teamPlaceId);
        log.info("ics파일 생성 - teamPlaceId : {}", teamPlaceId);
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void updateIcalendar(final ScheduleEvent scheduleEvent) {
        final Long teamPlaceId = scheduleEvent.getTeamPlaceId();

        icalendarPublishService.updateIcalendar(teamPlaceId);
        log.info("ics파일 업데이트 - teamPlaceId : {}", teamPlaceId);
    }
}
