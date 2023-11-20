package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.icalendar.domain.IcalendarPublishCounter;

import java.util.List;

@Component
@RequiredArgsConstructor
public class IcalendarPublishScheduler {

    private final IcalendarPublishService icalendarPublishService;
    private final IcalendarPublishCounter publishCounter;

    /**
     * 매시 45분에 밀린 icalendar 배포 수행
     */
    @Scheduled(cron = "0 45 * * * *")
    private void publishDelayedIcalendarUpdates() {
        final List<Long> teamPlaceIds = publishCounter.getPublishDelayedTeamPlaceIds();
        teamPlaceIds.forEach(teamPlaceId -> {
            icalendarPublishService.updateIcalendar(teamPlaceId);
            publishCounter.clearFor(teamPlaceId);
        });
    }
}
