package team.teamby.teambyteam.schedule.application;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import team.teamby.teambyteam.schedule.application.parser.LocalDateParser;
import team.teamby.teambyteam.schedule.domain.CalendarPeriod;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.schedule.domain.vo.Description;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;
import team.teamby.teambyteam.schedule.exception.ScheduleNotFoundException;
import team.teamby.teambyteam.schedule.exception.TeamScheduleAccessException;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceNotFoundException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TeamCalendarScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final TeamPlaceRepository teamPlaceRepository;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final LocalDateParser localDateParser;

    public Long register(final ScheduleRegisterRequest scheduleRegisterRequest, final Long teamPlaceId) {
        checkTeamPlaceExist(teamPlaceId);

        final Title title = new Title(scheduleRegisterRequest.title());
        final Span span = new Span(scheduleRegisterRequest.startDateTime(), scheduleRegisterRequest.endDateTime());
        final Description description = new Description(scheduleRegisterRequest.description());
        final Schedule schedule = new Schedule(teamPlaceId, title, description, span);

        final Schedule savedSchedule = scheduleRepository.save(schedule);
        log.info("일정 등록 - 팀플레이스 아이디 : {}, 일정 아이디 : {}", teamPlaceId, savedSchedule.getId());

        applicationEventPublisher.publishEvent(new ScheduleCreateEvent(savedSchedule.getId(), teamPlaceId));

        return savedSchedule.getId();
    }

    private void checkTeamPlaceExist(final Long teamPlaceId) {
        if (notExistTeamPlace(teamPlaceId)) {
            throw new TeamPlaceNotFoundException(teamPlaceId);
        }
    }

    private boolean notExistTeamPlace(final Long teamPlaceId) {
        return !teamPlaceRepository.existsById(teamPlaceId);
    }

    @Transactional(readOnly = true)
    public ScheduleResponse findSchedule(final Long scheduleId, final Long teamPlaceId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleNotFoundException(scheduleId));
        validateScheduleOwnerTeam(teamPlaceId, schedule);

        return ScheduleResponse.from(schedule);
    }

    private void validateScheduleOwnerTeam(final Long teamPlaceId, final Schedule schedule) {
        if (isNotScheduleOfTeam(teamPlaceId, schedule)) {
            throw new TeamScheduleAccessException(schedule.getId(), teamPlaceId);
        }
    }

    private boolean isNotScheduleOfTeam(final Long teamPlaceId, final Schedule schedule) {
        return !schedule.isScheduleOfTeam(teamPlaceId);
    }

    @Transactional(readOnly = true)
    public SchedulesResponse findScheduleInMonth(final Long teamPlaceId, final int targetYear, final int targetMonth) {
        checkTeamPlaceExist(teamPlaceId);

        final CalendarPeriod period = CalendarPeriod.of(targetYear, targetMonth);
        final List<Schedule> schedules = scheduleRepository
                .findAllByTeamPlaceIdAndPeriod(teamPlaceId, period.startDateTime(), period.endDatetime());

        return SchedulesResponse.of(schedules);
    }

    @Transactional(readOnly = true)
    public SchedulesResponse findScheduleInDay(
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

    @Transactional(readOnly = true)
    public SchedulesResponse findScheduleInPeriod(
            final Long teaPlaceId,
            final String startDateString,
            final String endDateString
    ) {
        checkTeamPlaceExist(teaPlaceId);

        final LocalDate startDate = localDateParser.parse(startDateString);
        final LocalDate endDate = localDateParser.parse(endDateString);
        final CalendarPeriod period = CalendarPeriod.of(startDate, endDate);

        final List<Schedule> schedules = scheduleRepository.
                findAllByTeamPlaceIdAndPeriod(teaPlaceId, period.startDateTime(), period.endDatetime());

        return SchedulesResponse.of(schedules);
    }

    public void update(final ScheduleUpdateRequest scheduleUpdateRequest, final Long teamPlaceId, final Long scheduleId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleNotFoundException(scheduleId));
        validateScheduleOwnerTeam(teamPlaceId, schedule);

        if (Objects.nonNull(scheduleUpdateRequest.title())) {
            schedule.changeTitle(scheduleUpdateRequest.title());
        }

        if (Objects.nonNull(scheduleUpdateRequest.description())) {
            schedule.changeDescription(scheduleUpdateRequest.description());
        }

        final LocalDateTime startDateTimeToUpdate = scheduleUpdateRequest.startDateTime();
        final LocalDateTime endDateTimeToUpdate = scheduleUpdateRequest.endDateTime();
        if (Objects.nonNull(startDateTimeToUpdate) && Objects.nonNull(endDateTimeToUpdate)) {
            schedule.changeSpan(startDateTimeToUpdate, endDateTimeToUpdate);
        }

        log.info("일정 수정 - 팀플레이스 아이디 : {}, 일정 아이디 : {}", teamPlaceId, scheduleId);

        applicationEventPublisher.publishEvent(new ScheduleUpdateEvent(scheduleId, teamPlaceId));
    }

    public void delete(final Long teamPlaceId, final Long scheduleId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleNotFoundException(scheduleId));
        validateScheduleOwnerTeam(teamPlaceId, schedule);

        scheduleRepository.deleteById(scheduleId);
        log.info("일정 삭제 - 팀플레이스 아이디 : {}, 일정 아이디 : {}", teamPlaceId, scheduleId);

        applicationEventPublisher.publishEvent(new ScheduleDeleteEvent(scheduleId, teamPlaceId));
    }
}
