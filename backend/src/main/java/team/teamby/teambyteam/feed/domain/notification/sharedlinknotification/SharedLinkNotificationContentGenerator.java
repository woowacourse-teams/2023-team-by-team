package team.teamby.teambyteam.feed.domain.notification.sharedlinknotification;

import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.sharedlink.application.event.SharedLinkEvent;

public class SharedLinkNotificationContentGenerator {

    protected static Content generateSharedLinkCreateContent(final SharedLinkEvent sharedLinkEvent) {
        final String title = sharedLinkEvent.getTitle().getValue();
        final String url = sharedLinkEvent.getSharedURL().getValue();

        final String content = String.format("'%s'[%s] 공유링크가 등록되었습니다.", title, url);

        return new Content(content);
    }

    protected static Content generateSharedLinkDeleteContent(final SharedLinkEvent sharedLinkEvent) {
        final String title = sharedLinkEvent.getTitle().getValue();

        final String content = String.format("'%s' 공유 링크가 삭제되었습니다.", title);

        return new Content(content);
    }
}
