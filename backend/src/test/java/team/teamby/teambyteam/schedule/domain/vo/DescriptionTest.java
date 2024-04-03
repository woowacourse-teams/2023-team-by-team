package team.teamby.teambyteam.schedule.domain.vo;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import team.teamby.teambyteam.schedule.exception.ScheduleDescriptionLengthException;

class DescriptionTest {

    @Test
    @DisplayName("일정의 메모는 100자를 넘길 수 없다.")
    void validateTest() {
        // given
        final String description = "*".repeat(101);

        // when
        // then
        Assertions.assertThatThrownBy(() -> new Description(description))
                .isInstanceOf(ScheduleDescriptionLengthException.class)
                .hasMessage("일정 메모가 너무 깁니다.");

    }

}
