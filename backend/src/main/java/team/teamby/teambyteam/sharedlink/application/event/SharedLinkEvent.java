package team.teamby.teambyteam.sharedlink.application.event;

import lombok.Getter;
import team.teamby.teambyteam.sharedlink.domain.vo.SharedURL;
import team.teamby.teambyteam.sharedlink.domain.vo.Title;

@Getter
@Deprecated
public abstract class SharedLinkEvent {

    private final Long sharedLinkId;
    private final Long teamPlaceId;
    private final Title title;
    private final SharedURL sharedURL;

    public SharedLinkEvent(final Long sharedLinkId, final Long teamPlaceId, final Title title, final SharedURL sharedURL) {
        this.sharedLinkId = sharedLinkId;
        this.teamPlaceId = teamPlaceId;
        this.title = title;
        this.sharedURL = sharedURL;
    }

    public abstract EventType getEventType();
}
