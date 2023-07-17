package team.teamby.teambyteam.schedule.application.dto;

import team.teamby.teambyteam.schedule.domain.Schedule;

import java.util.List;

public record SchedulesResponse(
        List<ScheduleResponse> schedules
) {
    public static SchedulesResponse of(final List<Schedule> schedules) {
        return new SchedulesResponse(schedules.stream()
                .map(ScheduleResponse::of)
                .toList()
        );
    }
}
