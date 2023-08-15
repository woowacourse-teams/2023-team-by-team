package team.teamby.teambyteam.common.fixtures;


import team.teamby.teambyteam.sharedlink.application.event.SharedLinkCreateEvent;
import team.teamby.teambyteam.sharedlink.application.event.SharedLinkDeleteEvent;
import team.teamby.teambyteam.sharedlink.domain.SharedLink;

public class SharedLinkEventFixtures {

    public static SharedLinkCreateEvent SHARED_LINK_CREATE_EVENT(final SharedLink sharedLink) {
        return new SharedLinkCreateEvent(sharedLink.getId(), sharedLink.getTeamPlaceId(), sharedLink.getTitle(), sharedLink.getSharedURL());
    }

    public static SharedLinkDeleteEvent SHARED_LINK_DELETE_EVENT(final SharedLink sharedLink) {
        return new SharedLinkDeleteEvent(sharedLink.getId(), sharedLink.getTeamPlaceId(), sharedLink.getTitle(), sharedLink.getSharedURL());
    }
}
