package team.teamby.teambyteam.schedule.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.schedule.exception.ScheduleException;

import java.util.Objects;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
public class Description {

    private static final int MAX_LENGTH = 100;

    @Column(name = "description", columnDefinition = "TEXT", nullable = true)
    private String value;

    public Description(final String value) {
        if (Objects.isNull(value) || value.isBlank()) {
            this.value = null;
            return;
        }
        validate(value);
        this.value = value.trim();
    }

    private static void validate(final String value) {
        if (value.length() > MAX_LENGTH) {
            throw new ScheduleException.DescriptionLengthException();
        }
    }

    public boolean isExist() {
        return Objects.nonNull(value);
    }
}
