package team.teamby.teambyteam.teamplace.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceInviteCodeException;

import java.util.Objects;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EqualsAndHashCode
@Getter
public final class InviteCode {

    private static final int MAX_LENGTH = 8;

    @Column(name = "invite_code", nullable = false, length = MAX_LENGTH, unique = true)
    private String value;

    public InviteCode(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("팀 플레이스 초대코드는 null일 수 없습니다.");
        }
        if (value.length() != MAX_LENGTH) {
            throw new TeamPlaceInviteCodeException.LengthException();
        }
    }
}
