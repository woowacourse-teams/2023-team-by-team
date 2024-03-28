package team.teamby.teambyteam.member.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.member.exception.memberteamplace.TeamPlaceMemberDisplayNameLengthException;
import team.teamby.teambyteam.member.exception.memberteamplace.TeamPlaceMemberNameBlankException;

import java.util.Objects;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
@Getter
public class DisplayMemberName {

    private static final int MAX_LENGTH = 20;

    @Column(name = "display_member_name", nullable = false, length = MAX_LENGTH)
    private String value;

    public DisplayMemberName(final String value) {
        validateNullValue(value);
        final String trimmedValue = value.trim();
        validate(trimmedValue);
        this.value = trimmedValue;
    }

    private void validateNullValue(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("멤버 이름은 null일 수 없습니다.");
        }
    }

    private void validate(final String value) {
        if (value.length() > MAX_LENGTH) {
            throw new TeamPlaceMemberDisplayNameLengthException(MAX_LENGTH, value);
        }
        if (value.isBlank()) {
            throw new TeamPlaceMemberNameBlankException();
        }
    }
}
