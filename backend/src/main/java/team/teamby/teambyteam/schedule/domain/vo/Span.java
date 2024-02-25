package team.teamby.teambyteam.schedule.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.schedule.exception.ScheduleException;

import java.time.LocalDateTime;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Span {

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @Column(nullable = false)
    private LocalDateTime endDateTime;

    public Span(final LocalDateTime startDateTime, final LocalDateTime endDateTime) {
        validateDateTimeOrder(startDateTime, endDateTime);
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
    }

    private void validateDateTimeOrder(final LocalDateTime startDateTime, final LocalDateTime endDateTime) {
        if (startDateTime.isAfter(endDateTime)) {
            throw new ScheduleException.SpanWrongOrderException(startDateTime, endDateTime);
        }
    }

    public boolean isAllDay() {
        return isStartOfTheDate() && isEndOfTheDate();
    }

    private boolean isStartOfTheDate() {
        return startDateTime.getHour() == 0 && startDateTime.getMinute() == 0;
    }

    private boolean isEndOfTheDate() {
        return endDateTime.getHour() == 23 && endDateTime.getMinute() == 59;
    }
}
