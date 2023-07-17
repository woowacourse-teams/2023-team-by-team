package team.teamby.teambyteam.schedule.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleResponse;
import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.schedule.domain.Span;
import team.teamby.teambyteam.schedule.domain.Title;
import team.teamby.teambyteam.schedule.exception.ScheduleException;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final TeamPlaceRepository teamPlaceRepository;

    public Long register(final ScheduleRegisterRequest scheduleRegisterRequest, final Long teamPlaceId) {
        checkTeamPlaceExist(teamPlaceId);

        final Title title = new Title(scheduleRegisterRequest.title());
        final Span span = new Span(scheduleRegisterRequest.startDateTime(), scheduleRegisterRequest.endDateTime());
        final Schedule schedule = new Schedule(teamPlaceId, title, span);

        final Schedule savedSchedule = scheduleRepository.save(schedule);
        return savedSchedule.getId();
    }

    private void checkTeamPlaceExist(final Long teamPlaceId) {
        if (notExistTeamPlace(teamPlaceId)) {
            throw new TeamPlaceException.NotFoundException("ID에 해당하는 팀 플레이스를 찾을 수 없습니다.");
        }
    }

    private boolean notExistTeamPlace(final Long teamPlaceId) {
        return !teamPlaceRepository.existsById(teamPlaceId);
    }

    public ScheduleResponse findSchedule(final Long scheduleId, final Long teamPlaceId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleException.ScheduleNotFoundException("조회한 일정이 존재하지 않습니다."));
        validateScheduleOwnerTeam(teamPlaceId, schedule);

        return ScheduleResponse.of(schedule);
    }

    private void validateScheduleOwnerTeam(final Long teamPlaceId, final Schedule schedule) {
        if (isNotScheduleOfTeam(teamPlaceId, schedule)) {
            throw new ScheduleException.TeamAccessForbidden("해당 팀플레이스에 일정을 조회할 권한이 없습니다.");
        }
    }

    private boolean isNotScheduleOfTeam(final Long teamPlaceId, final Schedule schedule) {
        return !schedule.isScheduleOfTeam(teamPlaceId);
    }

    public void update(final ScheduleUpdateRequest scheduleUpdateRequest, final Long teamPlaceId, final Long scheduleId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleException.ScheduleNotFoundException("ID에 해당하는 일정을 찾을 수 없습니다."));

        schedule.change(scheduleUpdateRequest.title(),
                scheduleUpdateRequest.startDateTime(), scheduleUpdateRequest.endDateTime());
    }
}
