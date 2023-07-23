package team.teamby.teambyteam.schedule.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.schedule.application.dto.*;
import team.teamby.teambyteam.schedule.domain.*;
import team.teamby.teambyteam.schedule.exception.ScheduleException;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;
import team.teamby.teambyteam.teamplace.domain.TeamPlaceRepository;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleService {

    private final MemberRepository memberRepository;
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

    @Transactional(readOnly = true)
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

    @Transactional(readOnly = true)
    public SchedulesResponse findScheduleInPeriod(final Long teamPlaceId, final int targetYear, final int targetMonth) {
        // TODO: 상의해보기 - 팀플레이스 소속 멤버 검증시 팀플레이스 아이디가 검증이 될 건데 해당 붑ㄴ에 대한 재 검증이 필요한가?
        checkTeamPlaceExist(teamPlaceId);

        final CalendarPeriod period = CalendarPeriod.of(targetYear, targetMonth);
        final List<Schedule> schedules = scheduleRepository
                .findAllByTeamPlaceIdAndPeriod(teamPlaceId, period.startDateTime(), period.endDatetime());

        return SchedulesResponse.of(schedules);
    }

    @Transactional(readOnly = true)
    public SchedulesWithTeamPlaceIdResponse findScheduleInPeriod(
            final MemberEmailDto memberEmailDto,
            final int targetYear,
            final int targetMonth
    ) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(() -> new MemberException.MemberNotFoundException("사용자를 찾을 수 없습니다."));

        final List<Long> participatedTeamPlaceIds = member.getTeamPlaces()
                .stream()
                .map(TeamPlace::getId)
                .toList();

        final CalendarPeriod period = CalendarPeriod.of(targetYear, targetMonth);
        final List<Schedule> schedules = scheduleRepository
                .findAllByTeamPlaceIdAndPeriod(participatedTeamPlaceIds, period.startDateTime(), period.endDatetime());

        return SchedulesWithTeamPlaceIdResponse.of(schedules);
    }

    public void update(final ScheduleUpdateRequest scheduleUpdateRequest, final Long teamPlaceId, final Long scheduleId) {
        checkTeamPlaceExist(teamPlaceId);

        final Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleException.ScheduleNotFoundException("ID에 해당하는 일정을 찾을 수 없습니다."));

        schedule.change(scheduleUpdateRequest.title(),
                scheduleUpdateRequest.startDateTime(), scheduleUpdateRequest.endDateTime());
    }

    public void delete(final Long teamPlaceId, final Long scheduleId) {
        checkTeamPlaceExist(teamPlaceId);
        checkScheduleExist(scheduleId);
        scheduleRepository.deleteById(scheduleId);
    }

    private void checkScheduleExist(final Long scheduleId) {
        if (notExistSchedule(scheduleId)) {
            throw new ScheduleException.ScheduleNotFoundException("ID에 해당하는 일정을 찾을 수 없습니다.");
        }
    }

    private boolean notExistSchedule(final Long scheduleId) {
        return !scheduleRepository.existsById(scheduleId);
    }
}
