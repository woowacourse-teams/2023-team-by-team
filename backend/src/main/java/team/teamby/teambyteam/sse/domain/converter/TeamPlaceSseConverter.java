package team.teamby.teambyteam.sse.domain.converter;

import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;

public interface TeamPlaceSseConverter<T> {
    TeamPlaceSseEvent convert(DomainEvent<T> event);

    String supportEventName();
}
