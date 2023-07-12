package team.teamby.teambyteam.teamplace.domain;

import static org.junit.jupiter.api.Assertions.*;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceException;

class NameTest {


    @Test
    @DisplayName("팀 플레이스 이름이 null이 되면 예외가 발생한다.")
    void failNameNull() {
        // given
        final String nullName = null;

        // when & then
        Assertions.assertThatThrownBy(() -> new Name(nullName))
                .isInstanceOf(TeamPlaceException.NameNullException.class)
                .hasMessage("팀 플레이스 이름은 빈 값일 수 없습니다.");
    }

    @Test
    @DisplayName("팀 플레이스 이름이 최대 길이(30자) 초과면 예외가 발생한다.")
    void failNameOverMaxLength() {
        // given
        final int maxLength = 30;
        final String overLengthName = "a".repeat(31);

        // when & then
        Assertions.assertThatThrownBy(() -> new Name(overLengthName))
                .isInstanceOf(TeamPlaceException.NameLengthException.class)
                .hasMessage("입력한 길이가 최대 이름 길이인 " + maxLength + "를 초과했습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "     "})
    @DisplayName("팀 플레이스 이름이 빈 값으로 이루어지면 예외가 발생한다.")
    void failNameIsBlank(final String blankName) {
        // when & then
        Assertions.assertThatThrownBy(() -> new Name(blankName))
                .isInstanceOf(TeamPlaceException.NameLengthException.class)
                .hasMessage("팀 플레이스 이름은 공백을 제외한 1자 이상이어야 합니다.");
    }
}
