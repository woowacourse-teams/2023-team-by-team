package team.teamby.teambyteam.feed.domain.vo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import team.teamby.teambyteam.feed.exception.FeedException;

import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ContentTest {

    @Test
    @DisplayName("피드 content를 정상적으로 생성한다.")
    void success() {
        // given
        final String contentValue = "이것은 피드내용 이다.";

        // when & then
        Assertions.assertThatNoException().isThrownBy(() -> new team.teamby.teambyteam.notice.domain.vo.Content(contentValue));
    }

    @ParameterizedTest(name = "입력된 값 : {0}")
    @MethodSource("provideWrongContentValueAndResult")
    @DisplayName("부적절한 내용으로 피드 설정하면 예외가 발생한다.")
    void fail(final String contentValue, final Class expectedExceptionClazz, final String expectedMessage) {
        // when & then
        assertThatThrownBy(() -> new Content(contentValue))
                .isInstanceOf(expectedExceptionClazz)
                .hasMessage(expectedMessage);
    }

    private static Stream<Arguments> provideWrongContentValueAndResult() {
        return Stream.of(
                Arguments.of(
                        null,
                        NullPointerException.class,
                        "피드 내용은 null일 수 없습니다."
                ),
                Arguments.of(
                        "d".repeat(10001),
                        FeedException.ContentLengthException.class,
                        "피드 내용의 길이가 최대 길이를 초과했습니다."
                )
        );
    }


}
