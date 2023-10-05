package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.icalendar.application.dto.IcalendarUrlResponse;
import team.teamby.teambyteam.icalendar.application.event.CreateIcalendarEvent;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendarRepository;

import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class IcalendarService {

    private final PublishedIcalendarRepository publishedIcalendarRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Transactional(readOnly = true)
    public Optional<IcalendarUrlResponse> getPublishedIcalUrl(final Long teamPlaceId) {
        final Optional<IcalendarUrlResponse> icalendarUrlResponse = publishedIcalendarRepository
                .findByTeamPlaceId(teamPlaceId)
                .flatMap(this::toIcalendarUrlResponse);

        if (icalendarUrlResponse.isEmpty()) {
            applicationEventPublisher.publishEvent(new CreateIcalendarEvent(teamPlaceId));
        }
        return icalendarUrlResponse;
    }

    private Optional<IcalendarUrlResponse> toIcalendarUrlResponse(final PublishedIcalendar publishedIcalendar) {
        return Optional.of(new IcalendarUrlResponse(publishedIcalendar.getPublishUrlValue()));
    }
}
