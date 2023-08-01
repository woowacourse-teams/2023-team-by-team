package team.teamby.teambyteam.feed.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.feed.domain.notification.ScheduleNotification;
import team.teamby.teambyteam.schedule.application.event.ScheduleEvent;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {

    private final FeedRepository feedRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener
    public void createScheduleNotification(final ScheduleEvent scheduleEvent) {
        ScheduleNotification scheduleNotification = ScheduleNotification.from(scheduleEvent);
        feedRepository.save(scheduleNotification);
    }
}
