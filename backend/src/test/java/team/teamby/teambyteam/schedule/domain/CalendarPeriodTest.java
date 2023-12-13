package team.teamby.teambyteam.schedule.domain;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import team.teamby.teambyteam.schedule.exception.ScheduleException;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static team.teamby.teambyteam.schedule.domain.CalendarPeriod.of;

class CalendarPeriodTest {

    @Test
    @DisplayName("LocalDate로 생성 테스트")
    void createWithLocalDate() {
        // given
        final LocalDate startDate = LocalDate.of(2023, 1, 1);
        final LocalDate endDate = LocalDate.of(2023, 1, 1);

        // when
        final CalendarPeriod calendarPeriod = of(startDate, endDate);

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(calendarPeriod.startDateTime()).isEqualTo(LocalDateTime.of(2023, 1, 1, 0, 0, 0));
            softly.assertThat(calendarPeriod.endDatetime()).isEqualTo(LocalDateTime.of(2023, 1, 2, 0, 0, 0));
        });
    }

    @Test
    @DisplayName("시작일보다 이른 종료일로 생성시 예외 발생")
    void exceptionWithWrongPeriodOrder() {
        // given
        final LocalDate startDate = LocalDate.of(2023, 1, 2);
        final LocalDate endDate = LocalDate.of(2023, 1, 1);

        // when
        // then
        assertThatThrownBy(() -> of(startDate, endDate))
                .isInstanceOf(ScheduleException.SpanWrongOrderException.class)
                .hasMessageContaining("시작 일자가 종료 일자보다 이후일 수 없습니다.");
    }
}
