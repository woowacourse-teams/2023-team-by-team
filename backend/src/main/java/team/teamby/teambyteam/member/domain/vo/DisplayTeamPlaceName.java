package team.teamby.teambyteam.member.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.member.exception.memberteamplace.MemberTeamPlaceException;

import java.util.Objects;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
@Getter
public class DisplayTeamPlaceName {

    private static final int MAX_LENGTH = 30;

    @Column(name = "display_team_place_name", nullable = false, length = MAX_LENGTH)
    private String value;

    public DisplayTeamPlaceName(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("팀플레이스의 이름은 null일 수 없습니다.");
        }
        if (value.length() > MAX_LENGTH) {
            throw new MemberTeamPlaceException.TeamPlaceDisplayNameLengthException(MAX_LENGTH, value);
        }
        if (value.isBlank()) {
            throw new MemberTeamPlaceException.TeamPlaceNameBlankException();
        }
    }
}
