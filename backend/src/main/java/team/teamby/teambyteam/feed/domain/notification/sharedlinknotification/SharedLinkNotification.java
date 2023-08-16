package team.teamby.teambyteam.feed.domain.notification.sharedlinknotification;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.feed.domain.FeedType;
import team.teamby.teambyteam.feed.domain.notification.Notification;
import team.teamby.teambyteam.feed.domain.vo.Content;
import team.teamby.teambyteam.sharedlink.application.event.SharedLinkEvent;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SharedLinkNotification extends Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private Long sharedLinkId;

    @Override
    public FeedType getType() {
        return FeedType.NOTIFICATION;
    }

    @Override
    public Long getId() {
        return id;
    }

    @Override
    public Long getAuthorId() {
        return sharedLinkId;
    }

    protected SharedLinkNotification(final Long teamPlaceId, final Content content, final Long sharedLinkId) {
        super(teamPlaceId, content);
        this.sharedLinkId = sharedLinkId;
    }

    public static SharedLinkNotification from(final SharedLinkEvent sharedLinkEvent) {
        return SharedLinkNotificationFactory.from(sharedLinkEvent);
    }
}
