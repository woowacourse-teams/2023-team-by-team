package team.teamby.teambyteam.sse.domain.converter;

import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;

public interface TeamPlaceSseConverter {
    TeamPlaceSseEvent convert(DomainEvent event);

    String supportEventName();
}
