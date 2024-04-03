package team.teamby.teambyteam.teamplace.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import team.teamby.teambyteam.teamplace.domain.vo.Name;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceNameBlankException;
import team.teamby.teambyteam.teamplace.exception.TeamPlaceNameLengthException;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class NameTest {


    @Test
    @DisplayName("팀 플레이스 이름이 null이 되면 예외가 발생한다.")
    void failNameNull() {
        // given
        final String nullName = null;

        // when & then
        assertThatThrownBy(() -> new Name(nullName))
                .isInstanceOf(NullPointerException.class)
                .hasMessageContaining("팀 플레이스 이름은 null일 수 없습니다.");
    }

    @Test
    @DisplayName("팀 플레이스 이름이 최대 길이(30자) 초과면 예외가 발생한다.")
    void failNameOverMaxLength() {
        // given
        final int maxLength = 30;
        final String overLengthName = "a".repeat(31);

        // when & then
        assertThatThrownBy(() -> new Name(overLengthName))
                .isInstanceOf(TeamPlaceNameLengthException.class)
                .hasMessageContaining("팀 플레이스 이름의 길이가 최대 이름 길이를 초과했습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "     "})
    @DisplayName("팀 플레이스 이름이 빈 값으로 이루어지면 예외가 발생한다.")
    void failNameIsBlank(final String blankName) {
        // when & then
        assertThatThrownBy(() -> new Name(blankName))
                .isInstanceOf(TeamPlaceNameBlankException.class)
                .hasMessageContaining("팀 플레이스 이름은 공백을 제외한 1자 이상이어야합니다.");
    }
}
