package team.teamby.teambyteam.schedule.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class NameTest {

    @Test
    @DisplayName("일정의 이름이 null이 되면 예외가 발생한다.")
    void failNameNull() {
        // given
        final String nullName = null;

        // when & then
        assertThatThrownBy(() -> new Name(nullName))
                .isInstanceOf(NullPointerException.class)
                .hasMessage("일정의 이름은 null일 수 없습니다.");
    }
}
