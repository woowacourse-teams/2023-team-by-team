package team.teamby.teambyteam.schedule.application.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public record ScheduleRegisterRequest(
        @NotBlank(message = "제목은 빈 값일 수 없습니다.")
        String title,

        String description,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        LocalDateTime startDateTime,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
        LocalDateTime endDateTime) {

    public ScheduleRegisterRequest(
            final String title,
            final LocalDateTime startDateTime,
            final LocalDateTime endDateTime) {
        this(title, null, startDateTime, endDateTime);
    }
}
