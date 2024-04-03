package team.teamby.teambyteam.member.domain.vo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import team.teamby.teambyteam.member.exception.memberteamplace.TeamPlaceMemberDisplayNameLengthException;
import team.teamby.teambyteam.member.exception.memberteamplace.TeamPlaceMemberNameBlankException;

import static org.assertj.core.api.Assertions.assertThat;

class DisplayMemberNameTest {

    @Test
    @DisplayName("팀플레이스에 사용할 멤버의 이름으로 null value가 입력되면 예외를 발생시킨다.")
    void failWithNullValue() {
        // given
        final String nullString = null;

        // when & then
        Assertions.assertThatThrownBy(() -> new DisplayMemberName(nullString))
                .isInstanceOf(NullPointerException.class)
                .hasMessage("멤버 이름은 null일 수 없습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "   "})
    @DisplayName("팀플레이스에 사용할 멤버의 이름으로는 공백이 들어올 수 없다.")
    void failWithBlankDisplayName(final String value) {
        // when & then
        Assertions.assertThatThrownBy(() -> new DisplayMemberName(value))
                .isInstanceOf(TeamPlaceMemberNameBlankException.class)
                .hasMessage("멤버 이름은 공백을 제외한 1자 이상이어야합니다.");
    }

    @Test
    @DisplayName("팀플레이스에 사용할 멤버의 이름으로는 20자가 초과할 수 없다.")
    void failWithOverNameLength() {
        // when & then
        Assertions.assertThatThrownBy(() -> new DisplayMemberName(".".repeat(21)))
                .isInstanceOf(TeamPlaceMemberDisplayNameLengthException.class)
                .hasMessageContaining("멤버 이름의 길이가 최대 이름 길이를 초과했습니다.");
    }

    @Test
    @DisplayName("이름 등록시 좌우 공백을 제거하고 등록한다.")
    void trimSpaces() {
        // given
        final String inputValue = " display name ";

        // when
        final DisplayMemberName displayMemberName = new DisplayMemberName(inputValue);

        //then
        final String trimmedValue = "display name";
        assertThat(displayMemberName.getValue()).isEqualTo(trimmedValue);
    }
}
