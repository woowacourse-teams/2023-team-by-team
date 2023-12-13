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
import team.teamby.teambyteam.schedule.application.event.ScheduleUpdateEventDto;
import team.teamby.teambyteam.schedule.domain.CalendarPeriod;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;
import team.teamby.teambyteam.schedule.exception.ScheduleException;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TeamCalendarScheduleService {

    private static final DateTimeFormatter DATE_PARAM_FORMAT = DateTimeFormatter.ofPattern("yyyyMMdd");

    private final ScheduleRepository scheduleRepository;
    private final TeamPlaceRepository teamPlaceRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    public Long register(final ScheduleRegisterRequest scheduleRegisterRequest, final Long teamPlaceId) {
        checkTeamPlaceExist(teamPlaceId);

        final Title title = new Title(scheduleRegisterRequest.title());
        final Span span = new Span(scheduleRegisterRequest.startDateTime(), scheduleRegisterRequest.endDateTime());
        final Schedule schedule = new Schedule(teamPlaceId, title, span);

        final Schedule savedSchedule = scheduleRepository.save(schedule);
        log.info("일정 등록 - 팀플레이스 아이디 : {}, 일정 아이디 : {}", teamPlaceId, savedSchedule.getId());

        applicationEventPublisher.publishEvent(new ScheduleCreateEvent(
                savedSchedule.getId(),
                teamPlaceId,
                savedSchedule.getTitle(),
                savedSchedule.getSpan()
        ));

        return savedSchedule.getId();
    }

    private void checkTeamPlaceExist(final Long teamPlaceId) {
        if (notExistTeamPlace(teamPlaceId)) {
            throw new TeamPlaceException.NotFoundException(teamPlaceId);
        }
    }

    private boolean notExistTeamPlace(final Long teamPlaceId) {
        return !teamPlaceRepository.existsById(teamPlaceId);
    }

    @Transactional(readOnly = true)
    public ScheduleResponse findSchedule(final Long scheduleId, final Long teamPlaceId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleException.ScheduleNotFoundException(scheduleId));
        validateScheduleOwnerTeam(teamPlaceId, schedule);

        return ScheduleResponse.from(schedule);
    }

    private void validateScheduleOwnerTeam(final Long teamPlaceId, final Schedule schedule) {
        if (isNotScheduleOfTeam(teamPlaceId, schedule)) {
            throw new ScheduleException.TeamAccessForbidden(schedule.getId(), teamPlaceId);
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

        LocalDate startDate;
        LocalDate endDate;
        try {
            startDate = LocalDate.parse(startDateString, DATE_PARAM_FORMAT);
            endDate = LocalDate.parse(endDateString, DATE_PARAM_FORMAT);
        } catch (final DateTimeParseException e) {
            throw new ScheduleException.dateFormatException(e);
        }

        final CalendarPeriod period = CalendarPeriod.of(startDate, endDate);
        final List<Schedule> schedules = scheduleRepository.
                findAllByTeamPlaceIdAndPeriod(teaPlaceId, period.startDateTime(), period.endDatetime());

        return SchedulesResponse.of(schedules);
    }

    public void update(final ScheduleUpdateRequest scheduleUpdateRequest, final Long teamPlaceId, final Long scheduleId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleException.ScheduleNotFoundException(scheduleId));
        validateScheduleOwnerTeam(teamPlaceId, schedule);

        final Title previousTitle = schedule.getTitle();
        final Span previousSpan = schedule.getSpan();

        final String titleToUpdate = scheduleUpdateRequest.title();
        final LocalDateTime startDateTimeToUpdate = scheduleUpdateRequest.startDateTime();
        final LocalDateTime endDateTimeToUpdate = scheduleUpdateRequest.endDateTime();

        schedule.change(titleToUpdate, startDateTimeToUpdate, endDateTimeToUpdate);
        log.info("일정 수정 - 팀플레이스 아이디 : {}, 일정 아이디 : {}", teamPlaceId, scheduleId);

        final ScheduleUpdateEventDto updatedScheduleInfo =
                ScheduleUpdateEventDto.of(titleToUpdate, startDateTimeToUpdate, endDateTimeToUpdate);

        applicationEventPublisher.publishEvent(new ScheduleUpdateEvent(
                scheduleId,
                teamPlaceId,
                previousTitle,
                previousSpan,
                updatedScheduleInfo
        ));
    }

    public void delete(final Long teamPlaceId, final Long scheduleId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleException.ScheduleNotFoundException(scheduleId));
        validateScheduleOwnerTeam(teamPlaceId, schedule);

        scheduleRepository.deleteById(scheduleId);
        log.info("일정 삭제 - 팀플레이스 아이디 : {}, 일정 아이디 : {}", teamPlaceId, scheduleId);

        applicationEventPublisher.publishEvent(new ScheduleDeleteEvent(
                scheduleId,
                teamPlaceId,
                schedule.getTitle(),
                schedule.getSpan()
        ));
    }
}
