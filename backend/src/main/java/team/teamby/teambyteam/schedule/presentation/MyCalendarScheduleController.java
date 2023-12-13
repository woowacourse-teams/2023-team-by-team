package team.teamby.teambyteam.schedule.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.schedule.application.MyCalendarScheduleService;
import team.teamby.teambyteam.schedule.application.dto.SchedulesWithTeamPlaceIdResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my-calendar")
public class MyCalendarScheduleController {

    private final MyCalendarScheduleService myCalendarScheduleService;

    @GetMapping(value = "/schedules", params = {"year", "month"})
    public ResponseEntity<SchedulesWithTeamPlaceIdResponse> findSchedulesInPeriod(
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestParam final Integer year,
            @RequestParam final Integer month
    ) {
        final SchedulesWithTeamPlaceIdResponse responseBody = myCalendarScheduleService.findScheduleInPeriod(memberEmailDto, year, month);

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping(value = "/schedules", params = {"year", "month", "day"})
    public ResponseEntity<SchedulesWithTeamPlaceIdResponse> findDailySchedule(
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestParam final Integer year,
            @RequestParam final Integer month,
            @RequestParam final Integer day
    ) {
        final SchedulesWithTeamPlaceIdResponse responseBody = myCalendarScheduleService.findScheduleInPeriod(memberEmailDto, year, month, day);

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping(value = "/schedules", params = {"startdate", "enddate"})
    public ResponseEntity<SchedulesWithTeamPlaceIdResponse> findDailySchedule(
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestParam(value = "startdate") final String startDate,
            @RequestParam(value = "enddate") final String endDate
    ) {
        final SchedulesWithTeamPlaceIdResponse responseBody = myCalendarScheduleService.findScheduleInPeriod(memberEmailDto, startDate, endDate);

        return ResponseEntity.ok(responseBody);
    }
}
