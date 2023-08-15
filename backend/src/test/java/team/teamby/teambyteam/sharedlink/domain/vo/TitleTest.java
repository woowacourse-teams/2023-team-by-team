package team.teamby.teambyteam.sharedlink.domain.vo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import team.teamby.teambyteam.sharedlink.exception.SharedLinkException;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class TitleTest {

    @ParameterizedTest
    @DisplayName("공유링크의 제목이 빈칸으로 구성되면 예외가 발생한다.")
    @ValueSource(strings = {"", " ", "          "})
    void failBlankTitle(final String value) {
        // when & then
        assertThatThrownBy(() -> new Title(value))
                .isInstanceOf(SharedLinkException.TitleBlankException.class)
                .hasMessage("공유 링크의 제목은 빈칸으로 구성될 수 없습니다.");
    }
}
