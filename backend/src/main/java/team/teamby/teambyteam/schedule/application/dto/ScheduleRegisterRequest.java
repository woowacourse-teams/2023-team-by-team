package team.teamby.teambyteam.schedule.application.dto;

import jakarta.validation.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

public record ScheduleRegisterRequest(
        @NotBlank(message = "제목은 빈 값일 수 없습니다.")
        String title,

        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime startDateTime,

        @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
        LocalDateTime endDateTime) {

}
