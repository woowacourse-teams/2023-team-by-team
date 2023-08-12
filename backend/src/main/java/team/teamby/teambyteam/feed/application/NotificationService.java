package team.teamby.teambyteam.feed.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.feed.domain.notification.ScheduleNotification;
import team.teamby.teambyteam.schedule.application.event.ScheduleEvent;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {

    private final FeedRepository feedRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener
    public void createScheduleNotification(final ScheduleEvent scheduleEvent) {
        final ScheduleNotification scheduleNotification = ScheduleNotification.from(scheduleEvent);
        final ScheduleNotification savedNotification = feedRepository.save(scheduleNotification);

        log.info("피드에 일정알림 생성 - 일정 아이디 : {}, 알림 아이디 : {}", savedNotification.getAuthorId(), savedNotification.getId());
    }
}
