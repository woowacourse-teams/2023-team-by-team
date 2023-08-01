package team.teamby.teambyteam.schedule.application;

import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleResponse;
import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;
import team.teamby.teambyteam.schedule.application.dto.SchedulesResponse;
import team.teamby.teambyteam.schedule.application.event.ScheduleCreateEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleDeleteEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleUpdateEvent;
import team.teamby.teambyteam.schedule.application.event.ScheduleUpdateEventDto;
import team.teamby.teambyteam.schedule.domain.CalendarPeriod;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;
import team.teamby.teambyteam.schedule.exception.ScheduleException;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TeamCalendarScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final TeamPlaceRepository teamPlaceRepository;
    private final ApplicationEventPublisher eventPublisher;

    public Long register(final ScheduleRegisterRequest scheduleRegisterRequest, final Long teamPlaceId) {
        checkTeamPlaceExist(teamPlaceId);

        final Title title = new Title(scheduleRegisterRequest.title());
        final Span span = new Span(scheduleRegisterRequest.startDateTime(), scheduleRegisterRequest.endDateTime());
        final Schedule schedule = new Schedule(teamPlaceId, title, span);

        final Schedule savedSchedule = scheduleRepository.save(schedule);

        eventPublisher.publishEvent(new ScheduleCreateEvent(savedSchedule.getId(), teamPlaceId, title, span));
        return savedSchedule.getId();
    }

    private void checkTeamPlaceExist(final Long teamPlaceId) {
        if (notExistTeamPlace(teamPlaceId)) {
            throw new TeamPlaceException.NotFoundException();
        }
    }

    private boolean notExistTeamPlace(final Long teamPlaceId) {
        return !teamPlaceRepository.existsById(teamPlaceId);
    }

    @Transactional(readOnly = true)
    public ScheduleResponse findSchedule(final Long scheduleId, final Long teamPlaceId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(ScheduleException.ScheduleNotFoundException::new);
        validateScheduleOwnerTeam(teamPlaceId, schedule);

        return ScheduleResponse.from(schedule);
    }

    private void validateScheduleOwnerTeam(final Long teamPlaceId, final Schedule schedule) {
        if (isNotScheduleOfTeam(teamPlaceId, schedule)) {
            throw new ScheduleException.TeamAccessForbidden();
        }
    }

    private boolean isNotScheduleOfTeam(final Long teamPlaceId, final Schedule schedule) {
        return !schedule.isScheduleOfTeam(teamPlaceId);
    }

    @Transactional(readOnly = true)
    public SchedulesResponse findScheduleInPeriod(final Long teamPlaceId, final int targetYear, final int targetMonth) {
        checkTeamPlaceExist(teamPlaceId);

        final CalendarPeriod period = CalendarPeriod.of(targetYear, targetMonth);
        final List<Schedule> schedules = scheduleRepository
                .findAllByTeamPlaceIdAndPeriod(teamPlaceId, period.startDateTime(), period.endDatetime());

        return SchedulesResponse.of(schedules);
    }

    @Transactional(readOnly = true)
    public SchedulesResponse findDailySchedule(
            final Long teamPlaceId,
            final int targetYear,
            final int targetMonth,
            final int targetDay
    ) {
        checkTeamPlaceExist(teamPlaceId);

        final CalendarPeriod dailyPeriod = CalendarPeriod.of(targetYear, targetMonth, targetDay);
        final List<Schedule> dailySchedules = scheduleRepository
                .findAllByTeamPlaceIdAndPeriod(teamPlaceId, dailyPeriod.startDateTime(), dailyPeriod.endDatetime());

        return SchedulesResponse.of(dailySchedules);
    }

    public void update(final ScheduleUpdateRequest scheduleUpdateRequest, final Long teamPlaceId, final Long scheduleId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule previousSchedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(ScheduleException.ScheduleNotFoundException::new);
        validateScheduleOwnerTeam(teamPlaceId, previousSchedule);

        Title previousTitle = previousSchedule.getTitle();
        Span previousSpan = previousSchedule.getSpan();

        String titleToUpdate = scheduleUpdateRequest.title();
        LocalDateTime startDateTimeToUpdate = scheduleUpdateRequest.startDateTime();
        LocalDateTime endDateTimeToUpdate = scheduleUpdateRequest.endDateTime();

        previousSchedule.change(titleToUpdate, startDateTimeToUpdate, endDateTimeToUpdate);

        ScheduleUpdateEventDto scheduleUpdateEventDto =
                ScheduleUpdateEventDto.of(titleToUpdate, startDateTimeToUpdate, endDateTimeToUpdate);

        eventPublisher.publishEvent(new ScheduleUpdateEvent(scheduleId, teamPlaceId,
                previousTitle, previousSpan, scheduleUpdateEventDto));
    }

    public void delete(final Long teamPlaceId, final Long scheduleId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(ScheduleException.ScheduleNotFoundException::new);
        validateScheduleOwnerTeam(teamPlaceId, schedule);

        scheduleRepository.deleteById(scheduleId);

        eventPublisher.publishEvent(new ScheduleDeleteEvent(scheduleId, teamPlaceId,
                schedule.getTitle(), schedule.getSpan()));
    }
}
