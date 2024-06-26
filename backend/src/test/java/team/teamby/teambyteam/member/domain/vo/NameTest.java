package team.teamby.teambyteam.member.domain.vo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import team.teamby.teambyteam.member.exception.MemberNameBlankException;
import team.teamby.teambyteam.member.exception.MemberNameLengthException;

class NameTest {

    @Test
    @DisplayName("멤버 이름이 null이 되면 예외가 발생한다.")
    void failNameNull() {
        // given
        final String nullName = null;

        // when & then
        Assertions.assertThatThrownBy(() -> new Name(nullName))
                .isInstanceOf(NullPointerException.class)
                .hasMessageContaining("멤버 이름은 null일 수 없습니다.");
    }

    @Test
    @DisplayName("멤버 이름이 최대 길이(20자) 초과면 예외가 발생한다.")
    void failNameOverMaxLength() {
        // given
        final int maxLength = 20;
        final String overLengthName = "a".repeat(21);

        // when & then
        Assertions.assertThatThrownBy(() -> new Name(overLengthName))
                .isInstanceOf(MemberNameLengthException.class)
                .hasMessageContaining("멤버 이름의 길이가 최대 이름 길이를 초과했습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "     "})
    @DisplayName("멤버 이름이 빈 값으로 이루어지면 예외가 발생한다.")
    void failNameIsBlank(final String blankName) {
        // when & then
        Assertions.assertThatThrownBy(() -> new Name(blankName))
                .isInstanceOf(MemberNameBlankException.class)
                .hasMessageContaining("멤버 이름은 공백을 제외한 1자 이상이어야합니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {" roy", "roy ", " roy ", "  roy  "})
    @DisplayName("멤버 이름의 앞뒤에 공백이 존재할 경우 해당 공백이 제거된다.")
    void successWithTrimmedMemberName(final String untrimmedName) {
        // given & when
        final Name name = new Name(untrimmedName);
        final String expectedTrimmedName = "roy";

        // then
        Assertions.assertThat(name.getValue()).isEqualTo(expectedTrimmedName);
    }
}
