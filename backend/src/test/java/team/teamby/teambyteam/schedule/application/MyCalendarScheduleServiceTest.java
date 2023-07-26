package team.teamby.teambyteam.schedule.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;
import team.teamby.teambyteam.member.configuration.dto.MemberEmailDto;
import team.teamby.teambyteam.schedule.application.dto.ScheduleWithTeamPlaceIdResponse;
import team.teamby.teambyteam.schedule.application.dto.SchedulesWithTeamPlaceIdResponse;

import java.util.List;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Transactional
@Sql({"/h2-reset-pk.sql", "/h2-data.sql"})
public class MyCalendarScheduleServiceTest {

    @Autowired
    private MyCalendarScheduleService myCalendarScheduleService;

    @Nested
    @DisplayName("내 캘린더 정보 조회 시")
    class FindScheduleInMyCalendar {

        @Test
        @DisplayName("내 캘린더 정보 조회를 성공한다.")
        void success() {
            // given
            // member who participate in team 2, 3
            final MemberEmailDto memberEmailDto = new MemberEmailDto("dfg345@gmail.com");
            final int year = 2023;
            final int month = 6;

            // when
            final SchedulesWithTeamPlaceIdResponse scheduleInPeriod =  myCalendarScheduleService.findScheduleInPeriod(memberEmailDto, year, month);
            final List<ScheduleWithTeamPlaceIdResponse> scheduleResponses = scheduleInPeriod.schedules();

            //then
            assertSoftly(softly -> {
                softly.assertThat(scheduleResponses).hasSize(5);
                softly.assertThat(scheduleResponses.get(0).title()).isEqualTo("3번 팀플 6월 첫날");
                softly.assertThat(scheduleResponses.get(1).title()).isEqualTo("2번 팀플 6월 첫날");
                softly.assertThat(scheduleResponses.get(2).title()).isEqualTo("3번 팀플 A");
                softly.assertThat(scheduleResponses.get(3).title()).isEqualTo("2번 팀플 6월 어느날");
                softly.assertThat(scheduleResponses.get(4).title()).isEqualTo("3번 팀플 B");
            });
        }

    }
}
