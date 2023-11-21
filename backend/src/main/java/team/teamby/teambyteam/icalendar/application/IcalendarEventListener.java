package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import team.teamby.teambyteam.icalendar.application.event.CreateIcalendarEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleEvent;
import team.teamby.teambyteam.teamplace.application.event.TeamPlaceCreatedEvent;

@Component
@RequiredArgsConstructor
public class IcalendarEventListener {

    private final PeriodicIcalendarPublishService periodicIcalendarPublishService;

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void createIcalendar(final TeamPlaceCreatedEvent teamPlaceCreatedEvent) {
        periodicIcalendarPublishService.createAndPublishIcalendar(teamPlaceCreatedEvent.teamPlaceId());
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void createIcalendar(final CreateIcalendarEvent createIcalendarEvent) {
        periodicIcalendarPublishService.createAndPublishIcalendar(createIcalendarEvent.teamPlaceId());
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void updateIcalendar(final ScheduleEvent scheduleEvent) {
        periodicIcalendarPublishService.updateIcalendar(scheduleEvent.getTeamPlaceId());
    }
}
