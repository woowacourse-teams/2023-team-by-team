package team.teamby.teambyteam.sse.domain.converter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.common.domain.DomainEvent;
import team.teamby.teambyteam.sse.domain.TeamPlaceSseEvent;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
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
                .orElseThrow(() -> {
                    final String message = "TeamPlaceEvent Handler not found for " + eventName;
                    log.error(message);
                    return new RuntimeException(message);
                });

        return converter.convert(event);
    }
}
