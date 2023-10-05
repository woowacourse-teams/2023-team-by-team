package team.teamby.teambyteam.icalendar.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.icalendar.application.IcalendarService;
import team.teamby.teambyteam.icalendar.application.dto.IcalendarUrlResponse;
import team.teamby.teambyteam.icalendar.exception.IcalendarNotFoundException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class IcalendarController {

    private final IcalendarService icalendarService;

    @GetMapping("/team-place/{teamPlaceId}/icalendar-url")
    public ResponseEntity<IcalendarUrlResponse> getPublishedIcalendarUrl(@PathVariable final Long teamPlaceId) {
        return icalendarService.getPublishedIcalUrl(teamPlaceId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new IcalendarNotFoundException(teamPlaceId));
    }
}
