package team.teamby.teambyteam.schedule.application;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.member.domain.Member;
import team.teamby.teambyteam.member.domain.MemberRepository;
import team.teamby.teambyteam.member.domain.vo.Email;
import team.teamby.teambyteam.member.exception.MemberException;
import team.teamby.teambyteam.schedule.application.dto.SchedulesWithTeamPlaceIdResponse;
import team.teamby.teambyteam.schedule.domain.CalendarPeriod;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.ScheduleRepository;
import team.teamby.teambyteam.teamplace.domain.TeamPlace;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MyCalendarScheduleService {

    private final MemberRepository memberRepository;
    private final ScheduleRepository scheduleRepository;

    @Transactional(readOnly = true)
    public SchedulesWithTeamPlaceIdResponse findScheduleInPeriod(
            final MemberEmailDto memberEmailDto,
            final int targetYear,
            final int targetMonth
    ) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberException.MemberNotFoundException::new);

        final List<Long> participatedTeamPlaceIds = member.getTeamPlaces()
                .stream()
                .map(TeamPlace::getId)
                .toList();

        final CalendarPeriod period = CalendarPeriod.of(targetYear, targetMonth);
        final List<Schedule> schedules = scheduleRepository
                .findAllByTeamPlaceIdAndPeriod(participatedTeamPlaceIds, period.startDateTime(), period.endDatetime());

        return SchedulesWithTeamPlaceIdResponse.of(schedules);
    }

    @Transactional(readOnly = true)
    public SchedulesWithTeamPlaceIdResponse findDailySchedule(
            final MemberEmailDto memberEmailDto,
            final int targetYear,
            final int targetMonth,
            final int targetDay
    ) {
        final Member member = memberRepository.findByEmail(new Email(memberEmailDto.email()))
                .orElseThrow(MemberException.MemberNotFoundException::new);

        final List<Long> participatedTeamPlaceIds = member.getTeamPlaces()
                .stream()
                .map(TeamPlace::getId)
                .toList();

        final CalendarPeriod dailyPeriod = CalendarPeriod.of(targetYear, targetMonth, targetDay);
        final List<Schedule> dailySchedules = scheduleRepository.findAllByTeamPlaceIdAndPeriod(
                participatedTeamPlaceIds, dailyPeriod.startDateTime(), dailyPeriod.endDatetime());

        return SchedulesWithTeamPlaceIdResponse.of(dailySchedules);
    }
}
