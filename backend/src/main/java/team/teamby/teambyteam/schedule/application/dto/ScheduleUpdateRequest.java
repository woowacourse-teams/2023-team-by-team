package team.teamby.teambyteam.schedule.application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public record ScheduleUpdateRequest(
        String title,
        String description,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        LocalDateTime startDateTime,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        LocalDateTime endDateTime) {

    public ScheduleUpdateRequest(
            final String title,
            final LocalDateTime startDateTime,
            final LocalDateTime endDateTime) {
        this(title, null, startDateTime, endDateTime);
    }
}
