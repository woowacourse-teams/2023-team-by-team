package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
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
    private final ApplicationEventPublisher applicationEventPublisher;

    @EventListener
    public void createIcalendar(final TeamPlaceCreatedEvent teamPlaceCreatedEvent) {
        applicationEventPublisher.publishEvent(new CreateIcalendarEvent(teamPlaceCreatedEvent.teamPlaceId()));
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void createIcalendar(final CreateIcalendarEvent createIcalendarEvent) {
        final Long teamPlaceId = createIcalendarEvent.teamPlaceId();

        log.info("Icalendar 생성 시작 - 팀플레이스 아이디 : {}", teamPlaceId);
        System.out.println("----- ical create start ------");
        icalendarPublishService.createAndPublishIcalendar(teamPlaceId);
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void updateIcalendar(final ScheduleEvent scheduleEvent) {
        final Long teamPlaceId = scheduleEvent.getTeamPlaceId();

        icalendarPublishService.updateIcalendar(teamPlaceId);
    }
}
