package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
import team.teamby.teambyteam.icalendar.domain.IcalendarFileName;
import team.teamby.teambyteam.icalendar.domain.IcalendarParser;
import team.teamby.teambyteam.icalendar.domain.PublishUrl;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendarRepository;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.teamplace.application.event.TeamPlaceCreatedEvent;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class IcalendarEventListener {

    private final PublishedIcalendarRepository publishedIcalendarRepository;
    private final TeamPlaceRepository teamPlaceRepository;
    private final ScheduleRepository scheduleRepository;
    private final IcalendarParser icalendarParser;
    private final FileCloudUploader fileCloudUploader;

    @Value("${aws.s3.ical-directory}")
    private String icalDirectory;

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void createIcalendar(final TeamPlaceCreatedEvent teamPlaceCreatedEvent) {

        final Long teamPlaceId = teamPlaceCreatedEvent.teamPlaceId();
        if (publishedIcalendarRepository.existsByTeamPlaceId(teamPlaceId)) {
            return;
        }

        final IcalendarFileName icalendarFileName = IcalendarFileName.generateRandomFileName(teamPlaceId);
        final TeamPlace teamPlace = teamPlaceRepository.findById(teamPlaceId)
                .orElseThrow(() -> new IllegalArgumentException("아직 생성되지 않은 팀플레이스 아이디입니다 - " + teamPlaceId));
        final List<Schedule> schedules = scheduleRepository.findAllByTeamPlaceId(teamPlaceId);

        final String icalString = icalendarParser.parse(teamPlace, schedules);

        final String uploadedUrl = fileCloudUploader.upload(icalString.getBytes(), icalDirectory + "/" + icalendarFileName.getValue());

        final PublishedIcalendar publishedIcalendar = new PublishedIcalendar(teamPlaceId, icalendarFileName, new PublishUrl(uploadedUrl));

        publishedIcalendarRepository.save(publishedIcalendar);
    }
}
