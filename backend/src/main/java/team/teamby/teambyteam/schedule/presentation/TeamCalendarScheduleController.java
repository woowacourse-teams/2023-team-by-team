package team.teamby.teambyteam.schedule.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import team.teamby.teambyteam.schedule.application.TeamCalendarScheduleService;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.application.dto.ScheduleResponse;
import team.teamby.teambyteam.schedule.application.dto.ScheduleUpdateRequest;
import team.teamby.teambyteam.schedule.application.dto.SchedulesResponse;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/team-place")
public class TeamCalendarScheduleController {

    private final TeamCalendarScheduleService teamCalendarScheduleService;

    @GetMapping("/{teamPlaceId}/calendar/schedules/{scheduleId}")
    public ResponseEntity<ScheduleResponse> findSpecificSchedule(
            @PathVariable final Long teamPlaceId,
            @PathVariable final Long scheduleId
    ) {
        final ScheduleResponse responseBody = teamCalendarScheduleService.findSchedule(scheduleId, teamPlaceId);

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping(value = "/{teamPlaceId}/calendar/schedules", params = {"year", "month"})
    public ResponseEntity<SchedulesResponse> findScheduleInMonth(
            @PathVariable final Long teamPlaceId,
            @RequestParam final Integer year,
            @RequestParam final Integer month
    ) {
        final SchedulesResponse responseBody = teamCalendarScheduleService.findScheduleInMonth(teamPlaceId, year, month);

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping(value = "/{teamPlaceId}/calendar/schedules", params = {"year", "month", "day"})
    public ResponseEntity<SchedulesResponse> findDailySchedule(
            @PathVariable final Long teamPlaceId,
            @RequestParam final Integer year,
            @RequestParam final Integer month,
            @RequestParam final Integer day
    ) {
        final SchedulesResponse response = teamCalendarScheduleService.findScheduleInDay(teamPlaceId, year, month, day);

        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/{teamPlaceId}/calendar/schedules", params = {"startDate", "endDate"})
    public ResponseEntity<SchedulesResponse> findDailySchedule(
            @PathVariable final Long teamPlaceId,
            @RequestParam(value = "startDate") final String startDate,
            @RequestParam(value = "endDate") final String endDate
    ) {
        final SchedulesResponse response = teamCalendarScheduleService.findScheduleInPeriod(teamPlaceId, startDate, endDate);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{teamPlaceId}/calendar/schedules")
    public ResponseEntity<Void> register(
            @RequestBody @Valid final ScheduleRegisterRequest scheduleRegisterRequest,
            @PathVariable final Long teamPlaceId
    ) {

        final Long registeredId = teamCalendarScheduleService.register(scheduleRegisterRequest, teamPlaceId);
        final URI location = URI.create("/api/team-place/" + teamPlaceId + "/calendar/schedules/" + registeredId);
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{teamPlaceId}/calendar/schedules/{scheduleId}")
    public ResponseEntity<Void> update(
            @RequestBody @Valid final ScheduleUpdateRequest scheduleUpdateRequest,
            @PathVariable final Long teamPlaceId,
            @PathVariable final Long scheduleId) {

        teamCalendarScheduleService.update(scheduleUpdateRequest, teamPlaceId, scheduleId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{teamPlaceId}/calendar/schedules/{scheduleId}")
    public ResponseEntity<Void> delete(
            @PathVariable final Long teamPlaceId,
            @PathVariable final Long scheduleId) {

        teamCalendarScheduleService.delete(teamPlaceId, scheduleId);
        return ResponseEntity.noContent().build();
    }
}
