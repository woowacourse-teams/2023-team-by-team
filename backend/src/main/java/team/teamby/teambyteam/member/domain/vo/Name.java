package team.teamby.teambyteam.member.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.member.exception.MemberException;

import java.util.Objects;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Name {

    private static final int MAX_LENGTH = 20;

    @Column(name = "name", nullable = false, length = MAX_LENGTH)
    private String value;

    public Name(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("멤버 이름은 null일 수 없습니다.");
        }
        if (value.length() > MAX_LENGTH) {
            throw new MemberException.NameLengthException("입력한 길이가 최대 이름 길이인 " + MAX_LENGTH + "를 초과했습니다.");
        }
        if (value.isBlank()) {
            throw new MemberException.NameLengthException("멤버 이름은 공백을 제외한 1자 이상이어야 합니다.");
        }
    }
}
