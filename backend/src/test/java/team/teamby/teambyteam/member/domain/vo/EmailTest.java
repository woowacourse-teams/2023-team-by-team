package team.teamby.teambyteam.member.domain.vo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import team.teamby.teambyteam.member.exception.MemberException;

class EmailTest {

    @Test
    @DisplayName("이메일 이름이 null이 되면 예외가 발생한다.")
    void failEmailNull() {
        // given
        final String nullEmail = null;

        // when & then
        Assertions.assertThatThrownBy(() -> new Email(nullEmail))
                .isInstanceOf(NullPointerException.class)
                .hasMessage("이메일은 null일 수 없습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {"aaaagmail.com", "aaa@gmailcom", "aaagmailcom"})
    @DisplayName("이메일이 양식을 만족하지 않으면 예외가 발생한다.")
    void failEmailOverMaxLength(String value) {
        // when & then
        Assertions.assertThatThrownBy(() -> new Email(value))
                .isInstanceOf(MemberException.EmailRegexException.class)
                .hasMessageContaining("정해진 이메일의 양식이 아닙니다.");
    }
}
