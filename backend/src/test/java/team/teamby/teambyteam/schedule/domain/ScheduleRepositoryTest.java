package team.teamby.teambyteam.schedule.domain;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import java.time.LocalDateTime;
import java.util.List;


@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Sql(value = {"/h2-reset-pk.sql", "/h2-data.sql"})
class ScheduleRepositoryTest {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Test
    @DisplayName("특정 기간 내 팀플레이스 일정을 조회한다.")
    void findTeamPlaceScheduleInRange() {
        // given
        final Long teamPlaceId = 3L;
        final LocalDateTime firstDateTime = LocalDateTime.of(2023, 7, 1, 0, 0);
        final LocalDateTime endDateTime = LocalDateTime.of(2023, 7, 31, 23, 59);

        // when
        final List<Schedule> schedules = scheduleRepository.findAllByTeamPlaceInPeriod(teamPlaceId, firstDateTime, endDateTime);

        //then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(schedules).hasSize(4);
            softly.assertThat(schedules.get(0).getTitle().getValue()).isEqualTo("3번 팀플 B");
            softly.assertThat(schedules.get(1).getTitle().getValue()).isEqualTo("3번 팀플 C");
            softly.assertThat(schedules.get(2).getTitle().getValue()).isEqualTo("3번 팀플 E");
            softly.assertThat(schedules.get(3).getTitle().getValue()).isEqualTo("3번 팀플 D");
        });
    }
}