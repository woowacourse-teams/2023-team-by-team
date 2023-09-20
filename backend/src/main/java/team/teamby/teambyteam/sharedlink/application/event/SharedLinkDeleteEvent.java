package team.teamby.teambyteam.sharedlink.application.event;

import team.teamby.teambyteam.sharedlink.domain.vo.SharedURL;
import team.teamby.teambyteam.sharedlink.domain.vo.Title;

@Deprecated
public class SharedLinkDeleteEvent extends SharedLinkEvent {

    public SharedLinkDeleteEvent(final Long sharedLinkId, final Long teamPlaceId, final Title title, final SharedURL sharedURL) {
        super(sharedLinkId, teamPlaceId, title, sharedURL);
    }

    @Override
    public EventType getEventType() {
        return EventType.DELETE;
    }
}
