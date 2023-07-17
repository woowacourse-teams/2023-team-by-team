package team.teamby.teambyteam.fixtures;

import team.teamby.teambyteam.schedule.application.dto.ScheduleRegisterRequest;
import team.teamby.teambyteam.schedule.domain.Schedule;
import team.teamby.teambyteam.schedule.domain.Span;
import team.teamby.teambyteam.schedule.domain.Title;

import java.time.LocalDateTime;

public class ScheduleFixtures {

    public static class 팀플_1번_N시간_일정 {

        public static final Long ID = 1L;
        public static final String TITLE = "1번 팀플 N시간 일정";
        public static final Long TEAM_PLACE_ID = 1L;
        public static final LocalDateTime START_DATE_TIME = LocalDateTime.of(2023, 7, 12, 10, 0, 0);
        public static final LocalDateTime END_DATE_TIME = LocalDateTime.of(2023, 7, 12, 18, 0, 0);

        public static final ScheduleRegisterRequest REQUEST = new ScheduleRegisterRequest(TITLE, START_DATE_TIME, END_DATE_TIME);

        public static Schedule ENTITY() {
            return new Schedule(ID, TEAM_PLACE_ID, new Title(TITLE), new Span(START_DATE_TIME, END_DATE_TIME));
        }
    }
}
