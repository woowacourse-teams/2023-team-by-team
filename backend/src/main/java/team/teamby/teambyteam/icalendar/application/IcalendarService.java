package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.icalendar.application.dto.IcalendarUrlResponse;
import team.teamby.teambyteam.icalendar.application.event.CreateIcalendarEvent;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendarRepository;
import team.teamby.teambyteam.icalendar.exception.IcalendarNotFoundException;

@Transactional
@Service
@RequiredArgsConstructor
public class IcalendarService {

    private final PublishedIcalendarRepository publishedIcalendarRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Transactional(readOnly = true)
    public IcalendarUrlResponse getPublishedIcalUrl(final Long teamPlaceId) {
        final PublishedIcalendar publishedIcalendar = publishedIcalendarRepository.findByTeamPlaceId(teamPlaceId)
                .orElseThrow(() -> {
                    applicationEventPublisher.publishEvent(new CreateIcalendarEvent(teamPlaceId));
                    return new IcalendarNotFoundException(teamPlaceId);
                });

        return new IcalendarUrlResponse(publishedIcalendar.getPublishUrlValue());
    }
}
