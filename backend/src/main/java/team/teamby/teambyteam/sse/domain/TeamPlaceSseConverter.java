package team.teamby.teambyteam.sse.domain;

import team.teamby.teambyteam.common.domain.DomainEvent;

public interface TeamPlaceSseConverter {
    TeamPlaceSseEvent convert(DomainEvent event);

    String supportEventName();
}
