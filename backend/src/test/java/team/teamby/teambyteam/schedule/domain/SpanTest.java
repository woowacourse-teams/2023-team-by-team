package team.teamby.teambyteam.schedule.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import team.teamby.teambyteam.schedule.domain.vo.Span;
import team.teamby.teambyteam.schedule.exception.ScheduleSpanWrongOrderException;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class SpanTest {

    @Test
    @DisplayName("Span 생성 시 시작일자가 종료일자보다 이후면 예외가 발생한다.")
    void failSpanWrongRange() {
        // given
        final LocalDateTime startDateTime = LocalDateTime.now();
        final LocalDateTime endDateTime = LocalDateTime.now().minusDays(1);

        // when & then
        assertThatThrownBy(() -> new Span(startDateTime, endDateTime))
                .isInstanceOf(ScheduleSpanWrongOrderException.class)
                .hasMessageContaining("시작 일자가 종료 일자보다 이후일 수 없습니다.");
    }
}
