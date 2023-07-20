package team.teamby.teambyteam.schedule.presentation;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.schedule.application.ScheduleService;
import team.teamby.teambyteam.schedule.application.dto.SchedulesWithTeamPlaceIdResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my-calendar")
public class MyCalendarScheduleController {

    private final ScheduleService scheduleService;

    @GetMapping("/schedules")
    public ResponseEntity<SchedulesWithTeamPlaceIdResponse> findSchedulesInPeriod(
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @RequestParam final Integer year,
            @RequestParam final Integer month
    ) {
        final SchedulesWithTeamPlaceIdResponse responseBody = scheduleService.findScheduleInPeriod(memberEmailDto, year, month);

        return ResponseEntity.ok(responseBody);
    }
}
