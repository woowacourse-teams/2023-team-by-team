package team.teamby.teambyteam.icalendar.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import team.teamby.teambyteam.icalendar.domain.vo.PublishUrl;

import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class PublishUrlTest {

    @Test
    @DisplayName("URL생성에 성공한다.")
    void successCreatingURL() {
        // given
        final String value = "https://asset.com/abcd.ics";

        // when & then
        assertThatNoException().isThrownBy(() -> new PublishUrl(value));
    }

    @Test
    @DisplayName("null값으로 생성을 하면 오류가 발생한다..")
    void failWithNullValue() {
        // given
        // when
        // then
        assertThatThrownBy(() -> new PublishUrl(null))
                .isInstanceOf(NullPointerException.class)
                .hasMessage("URL이 NULL로 입력되었습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "   "})
    @DisplayName("공백이름으로 URL을 생성하면 오류가 발생한다.")
    void failWithBlankValue(final String blank) {
        // given
        // when
        // then
        assertThatThrownBy(() -> new PublishUrl(blank))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("URL로 공백이 입력되었습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {"wrong-url", "wrongurl.com", "https://wrongurl", "https://wrong!url.com", "https://wrongurl.com/ n"})
    @DisplayName("잘못된 URL형식이 입력되면 오류가 발생한다.")
    void failWithWrongURLFormat(final String url) {
        // given
        // when
        // then
        assertThatThrownBy(() -> new PublishUrl(url))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("URL이 형식에 맞지 않습니다. 입력된 값 : ");
    }
}
