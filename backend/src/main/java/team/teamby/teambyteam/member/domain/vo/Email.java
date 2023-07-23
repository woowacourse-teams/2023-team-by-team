package team.teamby.teambyteam.member.domain.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.teamby.teambyteam.member.exception.MemberException;

import java.util.Objects;
import java.util.regex.Pattern;

@EqualsAndHashCode
@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Email {

    private static final String EMAIL_REGEX = "^([\\w\\.\\_\\-])*[a-zA-Z0-9]+([\\w\\.\\_\\-])*([a-zA-Z0-9])+([\\w\\.\\_\\-])+@([a-zA-Z0-9]+\\.)+[a-zA-Z0-9]{2,8}$";

    @Column(name = "email", nullable = false)
    private String value;

    public Email(final String value) {
        validate(value);
        this.value = value;
    }

    private void validate(final String value) {
        if (Objects.isNull(value)) {
            throw new NullPointerException("이메일은 null일 수 없습니다.");
        }

        if (isNotMatchEmailForm(value)) {
            throw new MemberException.EmailRegexException("정해진 이메일의 양식이 아닙니다.");
        }
    }

    private boolean isNotMatchEmailForm(final String value) {
        return !Pattern.matches(EMAIL_REGEX, value);
    }
}
