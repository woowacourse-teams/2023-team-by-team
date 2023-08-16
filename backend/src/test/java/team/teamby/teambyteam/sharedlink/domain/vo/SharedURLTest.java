package team.teamby.teambyteam.sharedlink.domain.vo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import team.teamby.teambyteam.sharedlink.exception.SharedLinkException;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class SharedURLTest {

    @ParameterizedTest
    @DisplayName("공유링크가 빈칸으로 구성되면 예외가 발생한다.")
    @ValueSource(strings = {"", " ", "          "})
    void failBlankTitle(final String value) {
        // when & then
        assertThatThrownBy(() -> new SharedURL(value))
                .isInstanceOf(SharedLinkException.URLBlankException.class)
                .hasMessage("공유 링크는 빈칸으로 구성될 수 없습니다.");
    }
}
