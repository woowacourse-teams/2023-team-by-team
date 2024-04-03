package team.teamby.teambyteam.member.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.member.exception.MemberNameBlankException;
import team.teamby.teambyteam.member.exception.MemberNameLengthException;

import java.util.Objects;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
@Getter
public class Name {

    public static final int MAX_LENGTH = 20;

    @Column(name = "name", nullable = false, length = MAX_LENGTH)
    private String value;

    public Name(final String value) {
        validateNull(value);
        final String trimmedValue = value.trim();
        validate(trimmedValue);
        this.value = trimmedValue;
    }

    private void validateNull(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("멤버 이름은 null일 수 없습니다.");
        }
    }

    private void validate(final String value) {
        if (value.length() > MAX_LENGTH) {
            throw new MemberNameLengthException(MAX_LENGTH, value);
        }
        if (value.isBlank()) {
            throw new MemberNameBlankException();
        }
    }

    public Name change(final String name) {
        return new Name(name);
    }
}
