package team.teamby.teambyteam.schedule.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import team.teamby.teambyteam.schedule.application.ScheduleService;
import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;

import java.net.URI;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/team-place")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping("/{teamPlaceId}/calendar/schedules")
    public ResponseEntity<Void> register(
            @RequestBody @Valid final ScheduleRegisterRequest scheduleRegisterRequest,
            @PathVariable final Long teamPlaceId) {

        final Long registeredId = scheduleService.register(scheduleRegisterRequest, teamPlaceId);
        final URI location = URI.create("/api/team-place/" + teamPlaceId + "/calendar/schedules/" + registeredId);
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{teamPlaceId}/calendar/schedules/{scheduleId}")
    public ResponseEntity<Void> delete(
            @PathVariable final Long teamPlaceId,
            @PathVariable final Long scheduleId) {

        scheduleService.delete(teamPlaceId, scheduleId);
        return ResponseEntity.noContent().build();
    }
}
