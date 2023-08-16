package team.teamby.teambyteam.teamplace.domain.vo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class InviteCodeTest {

    @Test
    @DisplayName("초대코드가 null이 되면 예외가 발생한다.")
    void failInviteCodeNull() {
        // given
        final String nullInviteCode = null;

        // when & then
        Assertions.assertThatThrownBy(() -> new InviteCode(nullInviteCode))
                .isInstanceOf(NullPointerException.class)
                .hasMessage("팀 플레이스 초대코드는 null일 수 없습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "",
            "a",
            "aa",
            "aaa",
            "aaaa",
            "aaaaa",
            "aaaaaa",
            "aaaaaaa",
            "aaaaaaaaa",
            "aaaaaaaaaa"
    })
    @DisplayName("초대코드가 8글자가 아니면 예외가 발생한다.")
    void failInviteCodeNotLength8(final String value) {
        // given & when & then
        Assertions.assertThatThrownBy(() -> new InviteCode(value))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("맞지 않는 길이입니다.");
    }
}
