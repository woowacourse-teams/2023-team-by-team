package team.teamby.teambyteam.schedule.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Sql(value = {"/h2-reset-pk.sql", "/h2-data.sql"})
public class ScheduleRepositoryTest {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @ParameterizedTest
    @CsvSource(value = {"-1:false", "1:true"}, delimiter = ':')
    @DisplayName("일정이 존재하면 true, 존재하지 않으면 false를 반환한다.")
    void isExistById(Long scheduleId, boolean expected) {
        // when
        boolean actual = scheduleRepository.existsById(scheduleId);

        // then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    @DisplayName("일정이 있는 경우에 삭제가 되는지 확인한다.")
    void deleteById() {
        //given
        final long id = 1L;

        // when
        boolean before = scheduleRepository.existsById(id);
        scheduleRepository.deleteById(id);
        boolean after = scheduleRepository.existsById(id);

        // then
        assertThat(before).isTrue();
        assertThat(after).isFalse();
    }
}
