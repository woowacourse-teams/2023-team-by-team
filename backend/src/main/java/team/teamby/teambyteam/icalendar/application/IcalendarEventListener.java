package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import team.teamby.teambyteam.schedule.application.event.ScheduleEvent;
import team.teamby.teambyteam.teamplace.application.event.TeamPlaceCreatedEvent;

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
    }

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void updateIcalendar(final ScheduleEvent scheduleEvent) {
        final Long teamPlaceId = scheduleEvent.getTeamPlaceId();

        icalendarPublishService.updateIcalendar(teamPlaceId);
    }
}
