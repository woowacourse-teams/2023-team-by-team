package team.teamby.teambyteam.sse.domain;

import org.springframework.stereotype.Component;
import team.teamby.teambyteam.common.domain.DomainEvent;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class TeamPlaceEventConvertMapper {

    private final Map<String, TeamPlaceSseConverter> converters;

    public TeamPlaceEventConvertMapper(final List<TeamPlaceSseConverter> converterList) {
        converters = new HashMap<>();
        converterList.forEach(converter -> converters.put(converter.supportEventName(), converter));
    }

    public TeamPlaceSseEvent convert(final DomainEvent event) {
        final String eventName = event.getClass().getName();
        final TeamPlaceSseConverter converter = Optional.ofNullable(converters.get(eventName))
                .orElseThrow(() -> new RuntimeException("TeamPlaceEvent Handler not found for " + eventName));

        return converter.convert(event);
    }
}
