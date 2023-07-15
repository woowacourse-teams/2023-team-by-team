package team.teamby.teambyteam.schedule.presentation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.member.configuration.AuthPrincipal;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.schedule.application.ScheduleService;
import team.teamby.teambyteam.schedule.application.dto.ScheduleResponse;

@RestController
public class ScheduleController {

    private ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("/api/team-place/{teamPlaceId}/calendar/schedules/{scheduleId}")
    public ResponseEntity<ScheduleResponse> findSpecificSchedule(
            @AuthPrincipal final MemberEmailDto memberEmailDto,
            @PathVariable("teamPlaceId") final Long teamPlaceId,
            @PathVariable("scheduleId") final Long scheduleId
    ) {
        final ScheduleResponse responseBody = scheduleService.findSchedule(scheduleId, teamPlaceId);

        return ResponseEntity.ok(responseBody);
    }
}
