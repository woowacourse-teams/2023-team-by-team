package team.teamby.teambyteam.schedule.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.schedule.exception.ScheduleException;

import java.util.Objects;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Title {

    @Column(name = "title", nullable = false)
    private String value;

    public Title(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("일정의 제목이 null일 수 없습니다.");
        }

        if (value.isBlank()) {
            throw new ScheduleException.TitleBlankException("일정의 제목은 빈 칸일 수 없습니다.");
        }
    }

    public Title change(final String value) {
        return new Title(value);
    }
}
