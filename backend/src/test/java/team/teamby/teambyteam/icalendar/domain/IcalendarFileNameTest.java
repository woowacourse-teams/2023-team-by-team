package team.teamby.teambyteam.icalendar.domain;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static java.lang.String.valueOf;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

class IcalendarFileNameTest {

    @Test
    @DisplayName("랜덤한 ics 파일명을 생성한다.")
    void suucessGenerateRandomFileName() {
        // given
        final Long teamPlaceId = 1L;

        // when
        final IcalendarFileName generatedFileName = IcalendarFileName.generateRandomFileName(teamPlaceId);
        final String fileNameString = generatedFileName.getValue();

        // then
        System.out.println(fileNameString);
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(fileNameString.startsWith(valueOf(teamPlaceId))).isTrue();
            softly.assertThat(fileNameString.endsWith(valueOf(".ics"))).isTrue();
        });
    }

    @Test
    @DisplayName("null값으로 생성을 하면 오류가 발생한다..")
    void failWithNullValue() {
        // given
        // when
        // then
        assertThatThrownBy(() -> new IcalendarFileName(null))
                .isInstanceOf(NullPointerException.class)
                .hasMessage("저장된 파일 명이 NULL로 입력되었습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "   "})
    @DisplayName("공백이름으로 파일을 생성하면 오류가 발생한다.")
    void failWithBlankValue(final String blank) {
        // given
        // when
        // then
        assertThatThrownBy(() -> new IcalendarFileName(blank))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("ics파일명으로 공백이 입력되었습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {"wrong-file.txt", "wrong-file", "wrong-file.iics", "wrong-file-ics"})
    @DisplayName("잘못된 확장자 명의 입력이 들어오면 오류가 발생한다.")
    void failWithWrongExtension(final String fileName) {
        // given
        // when
        // then
        assertThatThrownBy(() -> new IcalendarFileName(fileName))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("ics파일의 확장자가 맞지 않습니다. 입력된 파일 명 : ");
    }
}
