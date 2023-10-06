package team.teamby.teambyteam.feed.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;
import team.teamby.teambyteam.feed.domain.FeedRepository;
import team.teamby.teambyteam.feed.domain.notification.sharedlinknotification.SharedLinkNotification;
import team.teamby.teambyteam.sharedlink.application.event.SharedLinkEvent;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
@Deprecated
public class NotificationService {

    private final FeedRepository feedRepository;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener
    public void createSharedLinkNotification(final SharedLinkEvent sharedLinkEvent) {
        final SharedLinkNotification sharedLinkNotification = SharedLinkNotification.from(sharedLinkEvent);
        final SharedLinkNotification savedSharedLinkNotification = feedRepository.save(sharedLinkNotification);

        log.info("피드에 공유링크알림 생성 - 공유 링크 아이디 : {}, 알림 아이디 : {}", savedSharedLinkNotification.getAuthorId(), savedSharedLinkNotification.getId());
    }
}
