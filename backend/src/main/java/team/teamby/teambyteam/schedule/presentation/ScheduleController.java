package team.teamby.teambyteam.schedule.presentation;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
            @RequestBody @Valid ScheduleRegisterRequest scheduleRegisterRequest,
            @PathVariable Long teamPlaceId) {

        Long registeredId = scheduleService.register(scheduleRegisterRequest, teamPlaceId);
        URI location = URI.create("/api/team-place/" + teamPlaceId + "/calendar/schedules/" + registeredId);
        return ResponseEntity.created(location).build();
    }
}
