package team.teamby.teambyteam.schedule.application.event;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.domain.vo.Title;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public final class ScheduleUpdateEventDto {
    private final Title updatedTitle;
    private final Span updatedSpan;

    public static ScheduleUpdateEventDto of(String title, LocalDateTime startDateTime, LocalDateTime endDateTime) {
        return new ScheduleUpdateEventDto(new Title(title), new Span(startDateTime, endDateTime));
    }
}
