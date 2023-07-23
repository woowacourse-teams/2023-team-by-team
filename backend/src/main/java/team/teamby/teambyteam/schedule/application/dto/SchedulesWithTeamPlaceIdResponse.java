package team.teamby.teambyteam.schedule.application.dto;

import team.teamby.teambyteam.schedule.domain.Schedule;

import java.util.List;

public record SchedulesWithTeamPlaceIdResponse(
        List<ScheduleWithTeamPlaceIdResponse> schedules
) {
    public static SchedulesWithTeamPlaceIdResponse of(final List<Schedule> schedules) {
        return new SchedulesWithTeamPlaceIdResponse(schedules.stream()
                .map(ScheduleWithTeamPlaceIdResponse::of)
                .toList()
        );
    }
}
