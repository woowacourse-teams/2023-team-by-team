package team.teamby.teambyteam.schedule.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
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

    public void delete(final Long teamPlaceId, final Long scheduleId) {
        checkTeamPlaceExist(teamPlaceId);
        checkScheduleExist(scheduleId);
        scheduleRepository.deleteById(scheduleId);
    }

    private void checkScheduleExist(final Long scheduleId) {
        if (notExistSchedule(scheduleId)) {
            throw new ScheduleException.NotFoundException("ID에 해당하는 일정을 찾을 수 없습니다.");
        }
    }

    private boolean notExistSchedule(final Long scheduleId) {
        return !scheduleRepository.existsById(scheduleId);
    }
}
