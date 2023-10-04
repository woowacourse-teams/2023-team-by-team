package team.teamby.teambyteam.icalendar.application;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.filesystem.FileCloudUploader;
import team.teamby.teambyteam.icalendar.domain.IcalendarFileName;
import team.teamby.teambyteam.icalendar.domain.IcalendarParser;
import team.teamby.teambyteam.icalendar.domain.PublishUrl;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendar;
import team.teamby.teambyteam.icalendar.domain.PublishedIcalendarRepository;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class IcalendarPublishService {

    private static final String TEAM_PLACE_NOT_CREATED_EXCEPTION_MESSAGE = "아직 생성되지 않은 팀플레이스 아이디입니다 - ";

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
                .orElseThrow(() -> new IllegalArgumentException(TEAM_PLACE_NOT_CREATED_EXCEPTION_MESSAGE + teamPlaceId));

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
