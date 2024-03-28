package team.teamby.teambyteam.teamplace.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceNameBlankException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceNameLengthException;

import java.util.Objects;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
@Getter
public class Name {

    private static final int MAX_LENGTH = 30;

    @Column(name = "name", nullable = false, length = MAX_LENGTH)
    private String value;

    public Name(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("팀 플레이스 이름은 null일 수 없습니다.");
        }
        if (value.length() > MAX_LENGTH) {
            throw new TeamPlaceNameLengthException(MAX_LENGTH, value);
        }
        if (value.isBlank()) {
            throw new TeamPlaceNameBlankException();
        }
    }
}
