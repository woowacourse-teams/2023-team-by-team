package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.filesystem.FileStorageManager;
import team.teamby.teambyteam.icalendar.domain.IcalendarParser;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendarRepository;
import team.teamby.teambyteam.icalendar.domain.vo.IcalendarFileName;
import team.teamby.teambyteam.icalendar.domain.vo.PublishUrl;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class IcalendarPublishService {

    private static final String TEAM_PLACE_NOT_CREATED_EXCEPTION_MESSAGE = "존재하지 않은 팀플레이스 아이디입니다 - ";

    private final PublishedIcalendarRepository publishedIcalendarRepository;
    private final TeamPlaceRepository teamPlaceRepository;
    private final ScheduleRepository scheduleRepository;
    private final IcalendarParser icalendarParser;
    private final FileStorageManager fileStorageManager;

    @Value("${aws.s3.ical-directory}")
    private String icalDirectory;

    public void createAndPublishIcalendar(final Long teamPlaceId) {
        if (publishedIcalendarRepository.existsByTeamPlaceId(teamPlaceId)) {
            return;
        }
        final IcalendarFileName icalendarFileName = IcalendarFileName.generateRandomFileName(teamPlaceId);

        final String uploadedUrl = uploadIcalendarFile(teamPlaceId, icalendarFileName);

        final PublishedIcalendar publishedIcalendar = new PublishedIcalendar(teamPlaceId, icalendarFileName, new PublishUrl(uploadedUrl));
        publishedIcalendarRepository.save(publishedIcalendar);
    }

    private String uploadIcalendarFile(final Long teamPlaceId, final IcalendarFileName icalendarFileName) {
        final TeamPlace teamPlace = teamPlaceRepository.findById(teamPlaceId)
                .orElseThrow(() -> {
                    log.error("캘린더 생성요청이 들어온 팀플레이스가 존제하지 않음 - teamPlaceId : {}", teamPlaceId);
                    return new IllegalArgumentException(TEAM_PLACE_NOT_CREATED_EXCEPTION_MESSAGE + teamPlaceId);
                });

        final List<Schedule> schedules = scheduleRepository.findAllByTeamPlaceId(teamPlaceId);
        final String icalString = icalendarParser.parse(teamPlace, schedules);
        return fileStorageManager.upload(icalString.getBytes(), icalDirectory + "/" + icalendarFileName.getValue(), icalendarFileName.getValue());
    }

    public void updateIcalendar(final Long teamPlaceId) {
        publishedIcalendarRepository.findByTeamPlaceId(teamPlaceId)
                .ifPresentOrElse(
                        publishedIcal -> uploadIcalendarFile(teamPlaceId, publishedIcal.getIcalendarFileName()),
                        () -> createAndPublishIcalendar(teamPlaceId)
                );
    }
}
