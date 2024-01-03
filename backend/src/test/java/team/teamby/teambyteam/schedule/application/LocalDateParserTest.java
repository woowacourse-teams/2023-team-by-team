package team.teamby.teambyteam.schedule.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import team.teamby.teambyteam.schedule.application.parser.LocalDateParser;
import team.teamby.teambyteam.schedule.exception.ScheduleException;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class LocalDateParserTest {

    private final LocalDateParser localDateParser = new LocalDateParser();

    @Test
    @DisplayName("LocalDate 파싱을 성공한다")
    void success() {
        // given
        final String input = "20230102";

        // when
        final LocalDate actual = localDateParser.parse(input);

        // then
        assertThat(actual).isEqualTo(LocalDate.of(2023, 1, 2));
    }

    @ParameterizedTest
    @ValueSource(strings = {"2023-01-01", "2023721", "20230132"})
    @DisplayName("yyyyMMdd형식이 아닌 경우 예외가 발생한다.")
    void failWithWrongFormat(final String input) {
        // given

        // when
        // then
        assertThatThrownBy(() -> localDateParser.parse(input))
                .isInstanceOf(ScheduleException.dateFormatException.class)
                .hasMessage("잘못된 날짜 입력 형식입니다.");

    }

}
