package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
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
    private final FileCloudUploader fileCloudUploader;

    @Value("${aws.s3.ical-directory}")
    private String icalDirectory;

    public void createAndPublishIcalendar(final Long teamPlaceId) {
        if (publishedIcalendarRepository.existsByTeamPlaceId(teamPlaceId)) {
            return;
        }
        final IcalendarFileName icalendarFileName = IcalendarFileName.generateRandomFileName(teamPlaceId);
        final TeamPlace teamPlace = teamPlaceRepository.findById(teamPlaceId)
                .orElseThrow(() -> {
                    log.error("캘린더 생성요청이 들어온 팀플레이스가 존제하지 않음 - teamPlaceId : {}", teamPlaceId);
                    return new IllegalArgumentException(TEAM_PLACE_NOT_CREATED_EXCEPTION_MESSAGE + teamPlaceId);
                });

        final String uploadedUrl = uploadIcalendarFile(teamPlace, icalendarFileName);

        final PublishedIcalendar publishedIcalendar = new PublishedIcalendar(teamPlaceId, icalendarFileName, new PublishUrl(uploadedUrl));
        publishedIcalendarRepository.save(publishedIcalendar);
    }

    private String uploadIcalendarFile(final TeamPlace teamPlace, final IcalendarFileName icalendarFileName) {
        final List<Schedule> schedules = scheduleRepository.findAllByTeamPlaceId(teamPlace.getId());
        final String icalString = icalendarParser.parse(teamPlace, schedules);
        return fileCloudUploader.upload(icalString.getBytes(), icalDirectory + "/" + icalendarFileName.getValue());
    }

    public void updateIcalendar(Long teamPlaceId) {
        publishedIcalendarRepository.findByTeamPlaceId(teamPlaceId)
                .ifPresentOrElse(
                        publishedIcal -> {
                            final TeamPlace teamPlace = teamPlaceRepository.findById(teamPlaceId)
                                    .orElseThrow(() -> new IllegalArgumentException(TEAM_PLACE_NOT_CREATED_EXCEPTION_MESSAGE + teamPlaceId));
                            uploadIcalendarFile(teamPlace, publishedIcal.getIcalendarFileName());
                        },
                        () -> createAndPublishIcalendar(teamPlaceId)
                );
    }
}
