package team.teamby.teambyteam.feed.domain.notification.sharedlinknotification;

import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.sharedlink.application.event.EventType;
import team.teamby.teambyteam.sharedlink.application.event.SharedLinkEvent;

public class SharedLinkNotificationFactory {

    protected static SharedLinkNotification from(final SharedLinkEvent sharedLinkEvent) {
        final EventType eventType = sharedLinkEvent.getEventType();

        if (eventType.equals(EventType.CREATE)) {
            return generateSharedLinkNotificationCreateEvent(sharedLinkEvent);
        }
        return generateSharedLinkNotificationDeleteEvent(sharedLinkEvent);
    }

    private static SharedLinkNotification generateSharedLinkNotificationCreateEvent(final SharedLinkEvent sharedLinkEvent) {
        final Long sharedLinkId = sharedLinkEvent.getSharedLinkId();
        final Long teamPlaceId = sharedLinkEvent.getTeamPlaceId();
        final Content content = SharedLinkNotificationContentGenerator.generateSharedLinkCreateContent(sharedLinkEvent);

        return new SharedLinkNotification(teamPlaceId, content, sharedLinkId);
    }

    private static SharedLinkNotification generateSharedLinkNotificationDeleteEvent(final SharedLinkEvent sharedLinkEvent) {
        final Long sharedLinkId = sharedLinkEvent.getSharedLinkId();
        final Long teamPlaceId = sharedLinkEvent.getTeamPlaceId();
        final Content content = SharedLinkNotificationContentGenerator.generateSharedLinkDeleteContent(sharedLinkEvent);

        return new SharedLinkNotification(teamPlaceId, content, sharedLinkId);
    }
}
