package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import team.teamby.teambyteam.icalendar.domain.IcalendarPublishCounter;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class PeriodicIcalendarPublishService {

    private final IcalendarPublishService icalendarPublishService;
    private final IcalendarPublishCounter publishCounter;

    public void createAndPublishIcalendar(final Long teamPlaceId) {
        icalendarPublishService.createAndPublishIcalendar(teamPlaceId);
        log.info("ics파일 생성 - teamPlaceId : {}", teamPlaceId);
    }

    public void updateIcalendar(final Long teamPlaceId) {
        if (publishCounter.isReachedToMaxCount(teamPlaceId)) {
            log.warn("ics배포 과요청으로 배포 연기 : {}", teamPlaceId);
            return;
        }

        icalendarPublishService.updateIcalendar(teamPlaceId);
        log.info("ics파일 업데이트 - teamPlaceId : {}", teamPlaceId);
        publishCounter.addCountFor(teamPlaceId);
    }

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
