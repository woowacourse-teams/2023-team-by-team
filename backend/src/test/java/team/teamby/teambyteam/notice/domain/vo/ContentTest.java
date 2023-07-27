package team.teamby.teambyteam.notice.domain.vo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import team.teamby.teambyteam.notice.exception.NoticeException;

import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ContentTest {

    @Test
    @DisplayName("공지 content를 정상적으로 생성한다.")
    void success() {
        // given
        final String contentValue = "이것은 공지사항 이다.";

        // when & then
        Assertions.assertThatNoException().isThrownBy(() -> new Content(contentValue));
    }

    @ParameterizedTest(name = "입력된 값 : {0}")
    @MethodSource("provideWrongContentValueAndResult")
    @DisplayName("부적절한 내용으로 공지 설정하면 예외가 발생한다.")
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
                        "공지 내용은 null일 수 없습니다."
                ),
                Arguments.of(
                        "d".repeat(10001),
                        NoticeException.ContentLengthException.class,
                        "공지 내용의 길이가 최대 길이를 초과했습니다."
                )
        );
    }

}